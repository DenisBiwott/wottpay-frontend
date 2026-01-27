import { ref, computed } from 'vue'
import { useAuthStore } from '@/features/auth/store/auth.store'
import {
  setupTotpApi,
  confirmTotpSetupApi,
  disableTotpApi,
} from '@/features/auth/services/auth.service'
import { useToast } from '@/core/composables/useToast'
import axios from 'axios'

type TotpStep = 'idle' | 'setup' | 'verify' | 'disable'

export function useTotpSettings() {
  const authStore = useAuthStore()
  const toast = useToast()

  // State
  const currentStep = ref<TotpStep>('idle')
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const otpauthUrl = ref<string | null>(null)
  const secret = ref<string | null>(null)
  const verificationCode = ref('')

  // Computed
  const isTotpEnabled = computed(() => authStore.user?.isTotpEnabled ?? false)

  const qrCodeUrl = computed(() => {
    if (!otpauthUrl.value) return null
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(otpauthUrl.value)}`
  })

  // Actions
  function startEnableFlow() {
    currentStep.value = 'setup'
    error.value = null
    verificationCode.value = ''
  }

  function startDisableFlow() {
    currentStep.value = 'disable'
    error.value = null
    verificationCode.value = ''
  }

  function cancelFlow() {
    currentStep.value = 'idle'
    error.value = null
    otpauthUrl.value = null
    secret.value = null
    verificationCode.value = ''
  }

  async function initiateTotpSetup() {
    isLoading.value = true
    error.value = null

    try {
      const response = await setupTotpApi()
      otpauthUrl.value = response.otpauthUrl
      secret.value = response.secret
      currentStep.value = 'verify'
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        error.value = Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage
      } else {
        error.value = 'Failed to setup 2FA. Please try again.'
      }
    } finally {
      isLoading.value = false
    }
  }

  async function confirmTotpSetup(code: string) {
    if (!code || code.length !== 6) {
      error.value = 'Please enter a valid 6-digit code'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      await confirmTotpSetupApi(code)
      // Update user state to reflect TOTP is enabled
      if (authStore.user) {
        authStore.user.isTotpEnabled = true
      }
      toast.success('Two-factor authentication has been enabled')
      cancelFlow()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        error.value = Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage
      } else {
        error.value = 'Invalid verification code. Please try again.'
      }
    } finally {
      isLoading.value = false
    }
  }

  async function disableTotp(code: string) {
    if (!code || code.length !== 6) {
      error.value = 'Please enter a valid 6-digit code'
      return
    }

    isLoading.value = true
    error.value = null

    try {
      await disableTotpApi(code)
      // Update user state to reflect TOTP is disabled
      if (authStore.user) {
        authStore.user.isTotpEnabled = false
      }
      toast.success('Two-factor authentication has been disabled')
      cancelFlow()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        error.value = Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage
      } else {
        error.value = 'Invalid verification code. Please try again.'
      }
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  function onCodeComplete(code: string) {
    verificationCode.value = code
    if (currentStep.value === 'verify') {
      confirmTotpSetup(code)
    } else if (currentStep.value === 'disable') {
      disableTotp(code)
    }
  }

  return {
    // State
    currentStep,
    isLoading,
    error,
    otpauthUrl,
    secret,
    qrCodeUrl,
    verificationCode,
    // Computed
    isTotpEnabled,
    // Actions
    startEnableFlow,
    startDisableFlow,
    cancelFlow,
    initiateTotpSetup,
    confirmTotpSetup,
    disableTotp,
    clearError,
    onCodeComplete,
  }
}
