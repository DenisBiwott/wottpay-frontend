import { defineStore } from 'pinia'
import { ref } from 'vue'
import type {
  PaymentRequest,
  PaymentRequestFilters,
  CancelPaymentResponse,
} from '../types/paymentRequests.types'
import {
  fetchPaymentRequestsApi,
  cancelPaymentRequestApi,
} from '../services/paymentRequests.service'
import axios from 'axios'

export const usePaymentRequestsStore = defineStore('paymentRequests', () => {
  // State
  const paymentRequests = ref<PaymentRequest[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isCancelling = ref(false)
  const filters = ref<PaymentRequestFilters>({})

  // Actions
  async function fetchPaymentRequests(
    filterParams?: PaymentRequestFilters,
  ): Promise<PaymentRequest[]> {
    isLoading.value = true
    error.value = null

    // Store filters for future reference
    if (filterParams) {
      filters.value = filterParams
    }

    try {
      const data = await fetchPaymentRequestsApi(filterParams)
      paymentRequests.value = data
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
        error.value = 'Failed to fetch payment requests. Please try again.'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function cancelPaymentRequest(
    businessId: string,
    orderTrackingId: string,
  ): Promise<CancelPaymentResponse> {
    isCancelling.value = true
    error.value = null

    try {
      const data = await cancelPaymentRequestApi({ businessId, orderTrackingId })

      // Update the local state to reflect the cancelled status
      const request = paymentRequests.value.find((pr) => pr.trackingId === orderTrackingId)
      if (request) {
        request.status = 'RECALLED'
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
        error.value = 'Failed to cancel payment request. Please try again.'
      }
      throw err
    } finally {
      isCancelling.value = false
    }
  }

  function setFilters(newFilters: PaymentRequestFilters) {
    filters.value = newFilters
  }

  function clearFilters() {
    filters.value = {}
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    paymentRequests,
    isLoading,
    error,
    isCancelling,
    filters,
    // Actions
    fetchPaymentRequests,
    cancelPaymentRequest,
    setFilters,
    clearFilters,
    clearError,
  }
})
