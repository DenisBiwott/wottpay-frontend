// Transactions API service
import apiClient from '@/core/api/client'
import type { Transaction, TransactionFilters } from '../types/transactions.types'

export async function fetchTransactionsApi(filters?: TransactionFilters): Promise<Transaction[]> {
  const params: Record<string, string | number> = {}

  if (filters?.status !== undefined) {
    params.status = filters.status
  }
  if (filters?.startDate) {
    params.startDate = filters.startDate
  }
  if (filters?.endDate) {
    params.endDate = filters.endDate
  }

  const response = await apiClient.get<Transaction[]>('/payments/transactions', { params })
  return response.data
}
