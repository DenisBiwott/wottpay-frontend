// Auth store
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  User,
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from '@/features/auth/types/auth.types'
import apiClient from '@/core/api/client'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const accessToken = ref<string | null>(null)
  const refreshToken = ref<string | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

  // Actions
  async function login(credentials: LoginCredentials): Promise<LoginResponse> {
    isLoading.value = true
    error.value = null

    try {
      const response = await apiClient.post<LoginResponse>('/auth/login', credentials)
      const data = response.data

      // Store tokens and user data
      accessToken.value = data.accessToken
      refreshToken.value = data.refreshToken
      user.value = data.user

      // Persist to localStorage
      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)
      localStorage.setItem('user', JSON.stringify(data.user))

      return data
    } catch (err) {
      console.log('ERRR', err)
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        if (Array.isArray(errorMessage)) {
          error.value = errorMessage.join(' ')
        } else {
          error.value = errorMessage
        }
        console.log('Error Msg', errorMessage)
      } else {
        error.value = 'Login failed. Please try again.'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function logout(): Promise<void> {
    try {
      await apiClient.post('/auth/logout')
    } catch {
      // Continue with logout even if API call fails
    } finally {
      clearAuthState()
    }
  }

  async function refreshAccessToken(): Promise<RefreshTokenResponse | null> {
    const currentRefreshToken = refreshToken.value || localStorage.getItem('refreshToken')

    if (!currentRefreshToken) {
      clearAuthState()
      return null
    }

    try {
      const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
        refreshToken: currentRefreshToken,
      })
      const data = response.data

      accessToken.value = data.accessToken
      refreshToken.value = data.refreshToken

      localStorage.setItem('accessToken', data.accessToken)
      localStorage.setItem('refreshToken', data.refreshToken)

      return data
    } catch {
      clearAuthState()
      return null
    }
  }

  function initializeFromStorage(): void {
    const storedAccessToken = localStorage.getItem('accessToken')
    const storedRefreshToken = localStorage.getItem('refreshToken')
    const storedUser = localStorage.getItem('user')

    if (storedAccessToken && storedRefreshToken && storedUser) {
      accessToken.value = storedAccessToken
      refreshToken.value = storedRefreshToken
      try {
        user.value = JSON.parse(storedUser)
      } catch {
        // Invalid user data in storage
        clearAuthState()
      }
    }
  }

  function clearAuthState(): void {
    user.value = null
    accessToken.value = null
    refreshToken.value = null
    error.value = null

    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
  }

  return {
    // State
    user,
    accessToken,
    refreshToken,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    // Actions
    login,
    logout,
    refreshAccessToken,
    initializeFromStorage,
    clearAuthState,
  }
})
