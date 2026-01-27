import { ref, computed } from 'vue'
import axios from 'axios'
import type { PaymentRequestWithTransaction } from '../types/paymentRequests.types'
import { fetchPaymentRequestWithTransactionApi } from '../services/paymentRequests.service'
import { formatCurrency, humanReadableDate } from '@/core/utils/formatting'

export function useTransactionDetails() {
  // State
  const isOpen = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const paymentRequest = ref<PaymentRequestWithTransaction | null>(null)

  // Computed
  const hasTransaction = computed(() => !!paymentRequest.value?.transaction)

  const transaction = computed(() => paymentRequest.value?.transaction)

  // Actions
  async function openModal(paymentRequestId: string) {
    isOpen.value = true
    isLoading.value = true
    error.value = null
    paymentRequest.value = null

    try {
      paymentRequest.value = await fetchPaymentRequestWithTransactionApi(paymentRequestId)
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        error.value = Array.isArray(errorMessage) ? errorMessage.join(' ') : errorMessage
      } else {
        error.value = 'Failed to load transaction details. Please try again.'
      }
    } finally {
      isLoading.value = false
    }
  }

  function closeModal() {
    isOpen.value = false
    paymentRequest.value = null
    error.value = null
  }

  function clearError() {
    error.value = null
  }

  // Format helpers
  function formatTransactionAmount(amount: number, currency: string): string {
    return formatCurrency(amount, currency)
  }

  function formatTransactionDate(date: string): string {
    return humanReadableDate(date)
  }

  return {
    // State
    isOpen,
    isLoading,
    error,
    paymentRequest,
    // Computed
    hasTransaction,
    transaction,
    // Actions
    openModal,
    closeModal,
    clearError,
    // Helpers
    formatTransactionAmount,
    formatTransactionDate,
  }
}
