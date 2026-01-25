// Auth service for making API calls
import apiClient from '@/core/api/client'
import {
  type RefreshTokenResponse,
  type LoginResponse,
  type TotpVerifyResponse,
  type User,
  type TotpSetupResponse,
  type TotpConfirmResponse,
} from '../types/auth.types'

// Login API call
export async function loginApi(email: string, password: string) {
  const response = await apiClient.post<LoginResponse>('/auth/login', {
    email,
    password,
  })
  return response.data
}

// TOTP Verification API call
export async function verifyTotpApi(code: string) {
  const response = await apiClient.post<TotpVerifyResponse>('/auth/totp/verify', {
    code,
  })
  return response.data
}

// Logout API call
export async function logoutApi() {
  await apiClient.post('/auth/logout')
}

// Refresh Token API call
export async function refreshTokenApi(refreshToken: string) {
  const response = await apiClient.post<RefreshTokenResponse>('/auth/refresh', {
    refreshToken,
  })
  return response.data
}

// Fetch profile
export async function fetchUserProfileApi() {
  const response = await apiClient.get<User>('/auth/profile')
  return response.data
}

// Setup TOTP
export async function setupTotpApi(email: string, password: string) {
  const response = await apiClient.post<TotpSetupResponse>('/auth/totp/setup', {
    email,
    password,
  })
  return response.data
}

// Verify TOTP Setup
export async function confirmTotpSetupApi(code: string) {
  const response = await apiClient.post<TotpConfirmResponse>('/auth/totp/confirm', { code })
  return response.data
}

// Disable TOTP
export async function disableTotpApi(code: string) {
  const response = await apiClient.post<TotpConfirmResponse>('/auth/totp/disable', { code })
  return response.data
}
