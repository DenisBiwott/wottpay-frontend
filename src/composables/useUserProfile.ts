import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function useUserProfile() {
  const authStore = useAuthStore()
  const router = useRouter()

  // authStore.fetchAndSetUserProfile()

  const user = computed(() => authStore.user)

  const userEmail = computed(() => user.value?.email ?? '')

  const userRole = computed(() => user.value?.role ?? '')

  const businessName = computed(() => user.value?.business?.name ?? '')

  const userInitials = computed(() => {
    const email = userEmail.value
    if (!email) return '?'

    // Get first letter of email (before @)
    const namePart = email.split('@')[0]
    if (!namePart) return '?'

    // Get first two characters, uppercase
    return namePart.slice(0, 2).toUpperCase()
  })

  const firstName = computed(() => {
    const email = userEmail.value
    if (!email) return ''

    // Extract name from email (before @)
    const namePart = email.split('@')[0]
    if (!namePart) return ''

    // Capitalize first letter
    return namePart.charAt(0).toUpperCase() + namePart.slice(1)
  })

  function handleLogout() {
    authStore.logout()
    router.push({ name: 'login' })
  }

  return {
    user,
    userEmail,
    userRole,
    businessName,
    userInitials,
    firstName,
    handleLogout,
  }
}
