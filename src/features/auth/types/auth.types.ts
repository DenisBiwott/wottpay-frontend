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
}
