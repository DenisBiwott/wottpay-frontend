// Insights store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Insights } from '../types/insights.types'
import { fetchInsightsApi } from '../services/insights.service'

export const useInsightsStore = defineStore('insights', () => {
  // State
  const insights = ref<Insights | null>(null)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchInsights(): Promise<Insights | null> {
    isLoading.value = true
    error.value = null

    try {
      const data = await fetchInsightsApi()
      insights.value = data
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
        error.value = 'Failed to fetch insights. Please try again.'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    insights,
    isLoading,
    error,
    // Actions
    fetchInsights,
    clearError,
  }
})
