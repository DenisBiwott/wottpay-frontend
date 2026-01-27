import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useBusinessStore } from '../store/business.store'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { humanReadableDate } from '@/core/utils/formatting'
import { useToast } from '@/core/composables/useToast'

export function useBusinessSettings() {
  const businessStore = useBusinessStore()
  const authStore = useAuthStore()
  const toast = useToast()

  const { ipns, isLoading, isRegistering, error } = storeToRefs(businessStore)

  // Local state for form
  const newIpnUrl = ref('')
  const urlError = ref<string | null>(null)

  // Computed
  const businessName = computed(() => authStore.user?.business?.name || 'Unknown Business')
  const businessId = computed(() => authStore.user?.businessId || '')

  const isEmpty = computed(() => !isLoading.value && ipns.value.length === 0)

  // Sort IPNs by date (most recent first)
  const sortedIpns = computed(() => {
    return [...ipns.value].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
  })

  // Most recent IPN ID for highlighting
  const mostRecentIpnId = computed((): string | null => {
    if (sortedIpns.value.length > 0) {
      const firstIpn = sortedIpns.value[0]
      return firstIpn ? firstIpn.id : null
    }
    return null
  })

  // URL validation
  function isValidUrl(url: string): boolean {
    try {
      new URL(url)
      return url.startsWith('https://')
    } catch {
      return false
    }
  }

  function validateUrl(): boolean {
    urlError.value = null

    if (!newIpnUrl.value.trim()) {
      urlError.value = 'URL is required'
      return false
    }

    if (!isValidUrl(newIpnUrl.value.trim())) {
      urlError.value = 'Please enter a valid HTTPS URL'
      return false
    }

    return true
  }

  // Actions
  async function loadIPNs() {
    if (!businessId.value) return

    try {
      await businessStore.fetchIPNs(businessId.value)
    } catch {
      // Error is handled in store
    }
  }

  async function registerNewIPN() {
    if (!validateUrl()) return
    if (!businessId.value) {
      toast.error('Business ID not found')
      return
    }

    try {
      await businessStore.registerIPN({
        businessId: businessId.value,
        url: newIpnUrl.value.trim(),
        notificationType: 'POST',
      })
      newIpnUrl.value = ''
      toast.success('IPN webhook registered successfully')
    } catch {
      // Error is handled in store
    }
  }

  // Format date for display
  function formatIpnDate(date: string): string {
    return humanReadableDate(date)
  }

  // Load on mount
  onMounted(() => {
    loadIPNs()
  })

  return {
    // State
    ipns: sortedIpns,
    isLoading,
    isRegistering,
    error,
    isEmpty,
    businessName,
    newIpnUrl,
    urlError,
    mostRecentIpnId,
    // Actions
    loadIPNs,
    registerNewIPN,
    validateUrl,
    clearError: businessStore.clearError,
    // Helpers
    formatIpnDate,
  }
}
