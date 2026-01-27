import apiClient from '@/core/api/client'
import type {
  PaymentRequest,
  PaymentRequestFilters,
  CancelPaymentRequest,
  CancelPaymentResponse,
} from '../types/paymentRequests.types'

export async function fetchPaymentRequestsApi(
  filters?: PaymentRequestFilters,
): Promise<PaymentRequest[]> {
  const params: Record<string, string> = {}

  if (filters?.status) {
    params.status = filters.status
  }
  if (filters?.startDate) {
    params.startDate = filters.startDate
  }
  if (filters?.endDate) {
    params.endDate = filters.endDate
  }

  const response = await apiClient.get<PaymentRequest[]>('/payments/links', { params })
  return response.data
}

export async function cancelPaymentRequestApi(
  data: CancelPaymentRequest,
): Promise<CancelPaymentResponse> {
  const response = await apiClient.post<CancelPaymentResponse>('/payments/cancel', data)
  return response.data
}
