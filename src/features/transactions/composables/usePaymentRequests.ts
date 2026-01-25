import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePaymentRequestsStore } from '../store/paymentRequests.store'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useToast } from '@/core/composables/useToast'
import type { PaymentRequestStatus } from '../types/paymentRequests.types'

export function usePaymentRequests() {
  const paymentRequestsStore = usePaymentRequestsStore()
  const authStore = useAuthStore()
  const toast = useToast()

  const { paymentRequests, isLoading, error, isCancelling } = storeToRefs(paymentRequestsStore)

  const businessId = computed(() => authStore.user?.businessId ?? '')

  const isEmpty = computed(() => !isLoading.value && paymentRequests.value.length === 0)

  async function loadPaymentRequests() {
    if (!businessId.value) return
    await paymentRequestsStore.fetchPaymentRequests(businessId.value)
  }

  async function cancelRequest(orderTrackingId: string) {
    if (!businessId.value) return
    await paymentRequestsStore.cancelPaymentRequest(businessId.value, orderTrackingId)
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
      PENDING: 'warning',
      FAILED: 'error',
      CANCELLED: 'default',
      EXPIRED: 'info',
    }
    return variants[status]
  }

  function canCancel(status: PaymentRequestStatus): boolean {
    return status === 'PENDING'
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
    // Actions
    loadPaymentRequests,
    cancelRequest,
    copyPaymentUrl,
    getStatusVariant,
    canCancel,
    clearError: paymentRequestsStore.clearError,
  }
}
