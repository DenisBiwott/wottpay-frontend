import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePaymentRequestsStore } from '../store/paymentRequests.store'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useToast } from '@/core/composables/useToast'
import type { PaymentRequestStatus, PaymentRequestFilters } from '../types/paymentRequests.types'

export function usePaymentRequests() {
  const paymentRequestsStore = usePaymentRequestsStore()
  const authStore = useAuthStore()
  const toast = useToast()

  const { paymentRequests, isLoading, error, isCancelling, filters } =
    storeToRefs(paymentRequestsStore)

  const businessId = computed(() => authStore.user?.businessId ?? '')

  const isEmpty = computed(() => !isLoading.value && paymentRequests.value.length === 0)

  const hasActiveFilters = computed(() => {
    return !!(filters.value.status || filters.value.startDate || filters.value.endDate)
  })

  async function loadPaymentRequests(filterParams?: PaymentRequestFilters) {
    try {
      await paymentRequestsStore.fetchPaymentRequests(filterParams)
    } catch {
      // Error is handled in store
    }
  }

  async function applyFilters(newFilters: PaymentRequestFilters) {
    paymentRequestsStore.setFilters(newFilters)
    await loadPaymentRequests(newFilters)
  }

  async function clearFilters() {
    paymentRequestsStore.clearFilters()
    await loadPaymentRequests({})
  }

  async function cancelRequest(orderTrackingId: string) {
    if (!businessId.value) return
    try {
      await paymentRequestsStore.cancelPaymentRequest(businessId.value, orderTrackingId)
      toast.success('Payment request cancelled successfully')
    } catch {
      // Error is handled in store
    }
  }

  function copyPaymentUrl(redirectUrl: string) {
    navigator.clipboard.writeText(redirectUrl)
    toast.success('Payment URL copied to clipboard')
  }

  function getStatusVariant(
    status: PaymentRequestStatus,
  ): 'success' | 'warning' | 'error' | 'info' | 'default' {
    const variants: Record<
      PaymentRequestStatus,
      'success' | 'warning' | 'error' | 'info' | 'default'
    > = {
      COMPLETED: 'success',
      ACTIVE: 'warning',
      FAILED: 'error',
      CANCELLED: 'default',
      RECALLED: 'info',
    }
    return variants[status]
  }

  function canCancel(status: PaymentRequestStatus): boolean {
    return status === 'ACTIVE'
  }

  onMounted(() => {
    loadPaymentRequests()
  })

  return {
    // State
    paymentRequests,
    isLoading,
    error,
    isCancelling,
    isEmpty,
    filters,
    hasActiveFilters,
    // Actions
    loadPaymentRequests,
    applyFilters,
    clearFilters,
    cancelRequest,
    copyPaymentUrl,
    getStatusVariant,
    canCancel,
    clearError: paymentRequestsStore.clearError,
  }
}
