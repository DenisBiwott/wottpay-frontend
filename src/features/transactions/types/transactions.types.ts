// Transaction type definitions

export type TransactionStatusCode = 0 | 1 | 2 | 3

export type TransactionStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REVERSED'

export const TransactionStatusMap: Record<TransactionStatusCode, TransactionStatus> = {
  0: 'PENDING',
  1: 'COMPLETED',
  2: 'FAILED',
  3: 'REVERSED',
}
// {"id":"6978eda83ffd77b954a25365","paymentLinkId":"6978ed853ffd77b954a2535e","userId":"6978e9dd3ffd77b954a25313","businessId":"6978e9a03ffd77b954a25309","orderTrackingId":"04bbdf18-4724-4426-a61b-dacd9eea0d83","merchantReference":"FBE43DFC6F","paymentMethod":"MpesaKE","confirmationCode":"UAR5U54FUW","statusCode":1,"statusMessage":"Completed","amount":6,"currency":"KES","paymentAccount":"2547xxx62100","createdAt":"2026-01-27T16:54:00.297Z","updatedAt":"2026-01-27T16:54:00.297Z"}

export interface Transaction {
  id: string
  paymentLinkId: string
  userId: string
  businessId: string
  orderTrackingId: string
  merchantReference: string
  paymentMethod: string
  confirmationCode: string
  statusCode: TransactionStatusCode
  statusMessage: string
  amount: number
  currency: string
  paymentAccount: string
  createdAt: string
  updatedAt: string
}

export interface TransactionFilters {
  status?: TransactionStatusCode
  startDate?: string
  endDate?: string
}
