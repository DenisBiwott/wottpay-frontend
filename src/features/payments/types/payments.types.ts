// Payment request types

export interface IPN {
  ipnId: string
  businessId: string
  url: string
  createdAt: string
}

export interface BillingAddress {
  emailAddress?: string
  phoneNumber?: string
  countryCode: string
  firstName?: string
  lastName?: string
}

export interface CreatePaymentRequestPayload {
  amount: number
  currency: string
  description: string
  billingAddress: BillingAddress
  businessId: string
  callbackUrl: string
  notificationId: string
  subscriptionDetails?: SubscriptionDetails
}

export interface SubscriptionDetails {
  startDate: string
  endDate: string
  interval: string
}

export interface CreatePaymentRequestResponse {
  id: string
  merchantRef: string
  trackingId: string
  businessId: string
  amount: number
  currency: string
  status: string
  redirectUrl: string
  description: string
  createdAt: string
  userId: string
}

export interface PaymentRequestFormState {
  amount: string
  currency: string
  description: string
  emailAddress: string
  phoneNumber: string
  firstName: string
  lastName: string
  countryCode: string
}
