/**
 * Centralized Axios API Client
 *
 * This module provides a configured Axios instance for all API communication.
 * It handles authentication token management, automatic token refresh on 401
 * responses, and request queuing during token refresh to prevent race conditions.
 *
 * Key features:
 * - Automatic Bearer token attachment to all requests
 * - Transparent token refresh when access token expires
 * - Request queuing during refresh to prevent duplicate refresh calls
 * - Automatic redirect to login on refresh failure
 */
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { RefreshTokenResponse } from '@/features/auth/types/auth.types'
import { useAuthStore } from '@/features/auth/store/auth.store'

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    // Ngrok specific header to avoid warning page during development
    'ngrok-skip-browser-warning': 'true',
  },
})

/**
 * Token refresh state management.
 * `isRefreshing` prevents multiple simultaneous refresh requests.
 * `failedQueue` holds pending requests that arrived during refresh.
 */
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

/**
 * Processes all queued requests after token refresh completes.
 * If refresh succeeded, resolves queued requests with new token.
 * If refresh failed, rejects all queued requests with the error.
 *
 * @param error - The error if refresh failed, null if successful
 * @param token - The new access token if refresh succeeded
 */
const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach((request) => {
    if (error) {
      request.reject(error)
    } else if (token) {
      request.resolve(token)
    }
  })
  failedQueue = []
}

/**
 * Request Interceptor
 *
 * Attaches the Bearer token to all outgoing requests if available.
 * The token is retrieved from the auth store on each request to ensure
 * the latest token is always used.
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore()
    const accessToken = authStore.accessToken
    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/**
 * Response Interceptor
 *
 * Handles 401 Unauthorized responses by attempting token refresh.
 *
 * Flow:
 * 1. On 401 response, check if this is already a retry (via `_retry` flag)
 * 2. If refresh is already in progress, queue the request
 * 3. Otherwise, initiate token refresh
 * 4. On successful refresh, retry the original request with new token
 * 5. On refresh failure, clear auth state and redirect to login
 *
 * The `_retry` flag on the request config prevents infinite retry loops
 * when the refreshed token is also invalid.
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    // Only handle 401 errors
    if (error.response?.status !== 401 || !originalRequest) {
      return Promise.reject(error)
    }

    // Don't retry refresh token requests - this would cause infinite loop
    if (originalRequest.url?.includes('/auth/refresh')) {
      clearAuthData()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Prevent infinite retry loop with the _retry flag
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    // If already refreshing, queue this request to retry after refresh completes
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`
          }
          return apiClient(originalRequest)
        })
        .catch((err) => {
          return Promise.reject(err)
        })
    }

    // Mark this request as a retry attempt
    originalRequest._retry = true
    isRefreshing = true

    const authStore = useAuthStore()
    const refreshToken = authStore.refreshToken

    if (!refreshToken) {
      isRefreshing = false
      clearAuthData()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    try {
      // Attempt to refresh the access token
      const response = await axios.post<RefreshTokenResponse>(
        `${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      )

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      }

      // Process all queued requests with the new token
      processQueue(null, newAccessToken)

      return apiClient(originalRequest)
    } catch (refreshError) {
      // Refresh failed - reject all queued requests and redirect to login
      processQueue(refreshError, null)
      clearAuthData()
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

/**
 * Clears all authentication data from the store.
 * Called when token refresh fails or user session is invalid.
 */
function clearAuthData() {
  const authStore = useAuthStore()
  authStore.clearAuthState()
}

export default apiClient
