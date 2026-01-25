// Auth type definitions

export interface User {
  id: string
  email: string
  role: string
  totpVerified?: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
  requiresTotp: boolean
  user: User
}

export interface TotpVerifyRequest {
  code: string
}

export interface TotpVerifyResponse {
  accessToken: string
  refreshToken: string
  message: string
}

// TOTP seup response
export interface TotpSetupResponse {
  secret: string
  otpauthUrl: string
}

// Disable/ confirm TOTP response
export interface TotpConfirmResponse {
  message: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface AuthState {
  user: User | null
  accessToken: string | null
  refreshToken: string | null
  isLoading: boolean
  error: string | null
  pendingTotpToken: string | null
  pendingEmail: string | null
}
