// Auth store
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  User,
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
  TotpVerifyResponse,
} from '@/features/auth/types/auth.types'
import {
  fetchUserProfileApi,
  loginApi,
  logoutApi,
  refreshTokenApi,
  verifyTotpApi,
} from '@/features/auth/services/auth.service'

import axios from 'axios'

export const useAuthStore = defineStore(
  'auth',
  () => {
    // State
    const user = ref<User | null>(null)
    const accessToken = ref<string | null>(null)
    const refreshToken = ref<string | null>(null)
    const isLoading = ref(false)
    const error = ref<string | null>(null)
    const pendingTotpToken = ref<boolean>(false)

    // Getters
    const isAuthenticated = computed(() => !!accessToken.value && !!user.value)

    // Setter for access & refresh tokens
    function setTokens(
      access: string | null,
      refresh: string | null,
      userData: User | null = null,
    ) {
      accessToken.value = access
      refreshToken.value = refresh
      if (userData) {
        user.value = userData
      }
    }

    // Actions
    async function login(credentials: LoginCredentials): Promise<LoginResponse> {
      isLoading.value = true
      error.value = null

      try {
        const data = await loginApi(credentials.email, credentials.password)
        setTokens(data.accessToken, data.refreshToken, data.user)

        // If TOTP is required, store the token for verification
        if (data.requiresTotp) {
          pendingTotpToken.value = true
          return data
        }

        return data
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          const errorMessage = err.response.data.message
          if (Array.isArray(errorMessage)) {
            error.value = errorMessage.join(' ')
          } else {
            error.value = errorMessage
          }
        } else {
          error.value = 'Login failed. Please try again.'
        }
        throw err
      } finally {
        isLoading.value = false
      }
    }

    async function verifyTotp(code: string): Promise<TotpVerifyResponse> {
      if (!pendingTotpToken.value) {
        throw new Error('No pending TOTP verification')
      }

      isLoading.value = true
      error.value = null

      try {
        const data = await verifyTotpApi(code)

        // Store tokens and user data
        setTokens(data.accessToken, data.refreshToken)

        // Clear pending TOTP state
        pendingTotpToken.value = false

        return data
      } catch (err) {
        if (axios.isAxiosError(err) && err.response?.data?.message) {
          const errorMessage = err.response.data.message
          if (Array.isArray(errorMessage)) {
            error.value = errorMessage.join(' ')
          } else {
            error.value = errorMessage
          }
        } else {
          error.value = 'Verification failed. Please try again.'
        }
        throw err
      } finally {
        isLoading.value = false
      }
    }

    async function logout(): Promise<void> {
      try {
        await logoutApi()
      } catch {
        // Continue with logout even if API call fails
      } finally {
        clearAuthState()
      }
    }

    async function refreshAccessToken(): Promise<RefreshTokenResponse | null> {
      const currentRefreshToken = refreshToken.value

      if (!currentRefreshToken) {
        clearAuthState()
        return null
      }

      try {
        const data = await refreshTokenApi(currentRefreshToken)

        setTokens(data.accessToken, data.refreshToken)

        return data
      } catch {
        clearAuthState()
        return null
      }
    }

    // Set user details using fetched profile data
    async function fetchAndSetUserProfile(): Promise<User | null> {
      const data = await fetchUserProfileApi()
      user.value = data
      return data
    }

    function clearAuthState(): void {
      user.value = null
      accessToken.value = null
      refreshToken.value = null
      error.value = null
      pendingTotpToken.value = false
    }

    return {
      // State
      user,
      accessToken,
      refreshToken,
      isLoading,
      error,
      pendingTotpToken,
      // Getters
      isAuthenticated,
      // Actions
      login,
      logout,
      verifyTotp,
      refreshAccessToken,
      clearAuthState,
      fetchAndSetUserProfile,
    }
  },

  // Setup state persistence
  {
    persist: {
      key: 'auth-store',
      pick: ['user', 'accessToken', 'refreshToken'],
    },
  },
)
