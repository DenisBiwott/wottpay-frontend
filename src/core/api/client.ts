// Central Axios instance + Interceptors
import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { RefreshTokenResponse } from '@/features/auth/types/auth.types'
import { useAuthStore } from '@/features/auth/store/auth.store'

// Create axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Token refresh state
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

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

// Request interceptor - attach Bearer token
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

// Response interceptor - handle 401 errors and token refresh
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

    // Don't retry refresh token requests
    if (originalRequest.url?.includes('/auth/refresh')) {
      clearAuthData()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    // Don't retry if already retried
    if (originalRequest._retry) {
      return Promise.reject(error)
    }

    // If already refreshing, queue this request
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
      const response = await axios.post<RefreshTokenResponse>(
        `${import.meta.env.VITE_API_BASE_URL || '/api'}/auth/refresh`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      )

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data

      if (originalRequest.headers) {
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
      }

      processQueue(null, newAccessToken)

      return apiClient(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      clearAuthData()
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

function clearAuthData() {
  const authStore = useAuthStore()
  authStore.clearAuthState()
}

export default apiClient
