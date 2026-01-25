export type PaymentRequestStatus = 'COMPLETED' | 'PENDING' | 'FAILED' | 'CANCELLED' | 'EXPIRED'

export interface PaymentRequest {
  id: string
  merchantRef: string
  trackingId: string
  businessId: string
  amount: number
  currency: string
  status: PaymentRequestStatus
  redirectUrl: string
  description: string
  callbackUrl: string
  createdAt: string
}

export interface CancelPaymentRequest {
  businessId: string
  orderTrackingId: string
}

export interface CancelPaymentResponse {
  orderTrackingId: string
  status: string
  message: string
}
