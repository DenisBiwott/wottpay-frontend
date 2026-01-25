import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function useLogin() {
  const router = useRouter()
  const route = useRoute()
  const authStore = useAuthStore()

  const email = ref('')
  const password = ref('')

  const isLoading = () => authStore.isLoading
  const error = () => authStore.error

  async function handleLogin() {
    try {
      const response = await authStore.login({
        email: email.value,
        password: password.value,
      })

      // If TOTP is required, redirect to verification page
      if (response.requiresTotp) {
        router.push({ name: 'totp-verification' })
        return
      }

      const redirectPath = route.query.redirect as string
      router.push(redirectPath || { name: 'home' })
    } catch {
      // Error is handled by the store
    }
  }

  function resetForm() {
    email.value = ''
    password.value = ''
  }

  return {
    email,
    password,
    isLoading,
    error,
    handleLogin,
    resetForm,
  }
}
