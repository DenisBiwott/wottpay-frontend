import apiClient from '@/core/api/client'
import type {
  PaymentRequest,
  CancelPaymentRequest,
  CancelPaymentResponse,
} from '../types/paymentRequests.types'

export async function fetchPaymentRequestsApi(businessId: string): Promise<PaymentRequest[]> {
  const response = await apiClient.get<PaymentRequest[]>(`/payments/orders/business/${businessId}`)
  return response.data
}

export async function cancelPaymentRequestApi(
  data: CancelPaymentRequest,
): Promise<CancelPaymentResponse> {
  const response = await apiClient.post<CancelPaymentResponse>('/payments/cancel', data)
  return response.data
}
