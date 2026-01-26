// Payment services for API calls
import apiClient from '@/core/api/client'
import type {
  IPN,
  CreatePaymentRequestPayload,
  CreatePaymentRequestResponse,
} from '../types/payments.types'

export async function fetchIPNListApi(businessId: string): Promise<IPN[]> {
  const response = await apiClient.get<IPN[]>(`/payments/ipn/list/${businessId}`)
  return response.data
}

export async function createPaymentRequestApi(
  payload: CreatePaymentRequestPayload,
): Promise<CreatePaymentRequestResponse> {
  const response = await apiClient.post<CreatePaymentRequestResponse>('/payments/orders', payload)
  return response.data
}
