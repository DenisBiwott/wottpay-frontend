import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { IPN, RegisterIPNRequest } from '../types/business.types'
import { fetchIPNsApi, registerIPNApi } from '../services/business.service'

export const useBusinessStore = defineStore('business', () => {
  // State
  const ipns = ref<IPN[]>([])
  const isLoading = ref(false)
  const isRegistering = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchIPNs(businessId: string): Promise<IPN[]> {
    isLoading.value = true
    error.value = null

    try {
      const data = await fetchIPNsApi(businessId)
      ipns.value = data
      return data
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        if (Array.isArray(errorMessage)) {
          error.value = errorMessage.join(' ')
        } else {
          error.value = errorMessage
        }
      } else {
        error.value = 'Failed to fetch IPN webhooks. Please try again.'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  async function registerIPN(data: RegisterIPNRequest): Promise<IPN> {
    isRegistering.value = true
    error.value = null

    try {
      const newIpn = await registerIPNApi(data)
      // Add to the beginning of the list (most recent first)
      ipns.value = [newIpn, ...ipns.value]
      return newIpn
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        if (Array.isArray(errorMessage)) {
          error.value = errorMessage.join(' ')
        } else {
          error.value = errorMessage
        }
      } else {
        error.value = 'Failed to register IPN webhook. Please try again.'
      }
      throw err
    } finally {
      isRegistering.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    ipns,
    isLoading,
    isRegistering,
    error,
    // Actions
    fetchIPNs,
    registerIPN,
    clearError,
  }
})
