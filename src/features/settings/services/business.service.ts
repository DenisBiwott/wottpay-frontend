import apiClient from '@/core/api/client'
import type { IPN, RegisterIPNRequest, RegisterIPNResponse } from '../types/business.types'

export async function fetchIPNsApi(businessId: string): Promise<IPN[]> {
  const response = await apiClient.get<IPN[]>(`/payments/ipn/list/${businessId}`)
  return response.data
}

export async function registerIPNApi(data: RegisterIPNRequest): Promise<RegisterIPNResponse> {
  const response = await apiClient.post<RegisterIPNResponse>('/payments/ipn/register', data)
  return response.data
}
