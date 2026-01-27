export interface IPN {
  id: string
  businessId: string
  url: string
  notificationType: string
  createdAt: string
}

export interface RegisterIPNRequest {
  businessId: string
  url: string
  notificationType: 'POST'
}

export interface RegisterIPNResponse {
  id: string
  businessId: string
  url: string
  notificationType: string
  createdAt: string
}
