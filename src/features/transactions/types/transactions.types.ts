// Transaction type definitions

export type TransactionStatusCode = 0 | 1 | 2 | 3

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED'

export const TransactionStatusMap: Record<TransactionStatusCode, TransactionStatus> = {
  0: 'PENDING',
  1: 'COMPLETED',
  2: 'FAILED',
  3: 'REVERSED',
}

export interface Transaction {
  id: string
  description: string
  reference: string
  amount: number
  currency: string
  status: TransactionStatusCode
  createdAt: string
}

export interface TransactionFilters {
  status?: TransactionStatusCode
  startDate?: string
  endDate?: string
}
