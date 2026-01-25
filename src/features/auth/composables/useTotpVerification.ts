import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function useTotpVerification() {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  const code = ref('')
  const codeInputRef = ref<{ focus: () => void; clear: () => void } | null>(null)

  const isLoading = computed(() => authStore.isLoading)
  const error = computed(() => authStore.error)
  const hasPendingVerification = computed(() => !!authStore.pendingTotpToken)

  // If the user navigates here without a pending TOTP token, redirect to login
  onMounted(() => {
    if (!hasPendingVerification.value) {
      router.replace({ name: 'login' })
    }
  })

  async function handleVerify() {
    if (code.value.length !== 6) return

    try {
      await authStore.verifyTotp(code.value)

      const redirectPath = route.query.redirect as string
      router.push(redirectPath || { name: 'home' })
    } catch {
      code.value = ''
      codeInputRef.value?.clear()
    }
  }

  function handleCodeComplete(completedCode: string) {
    code.value = completedCode
    handleVerify()
  }

  function handleBackToLogin() {
    router.push({ name: 'login' })
  }

  function handleResendCode() {
    // TODO: Implement resend code API call
    code.value = ''
    codeInputRef.value?.clear()
  }

  return {
    code,
    codeInputRef,
    isLoading,
    error,
    hasPendingVerification,
    handleVerify,
    handleCodeComplete,
    handleBackToLogin,
    handleResendCode,
  }
}
