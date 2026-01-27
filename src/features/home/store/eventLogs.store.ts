import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { EventLog } from '../types/eventLog.types'
import { fetchEventLogsApi } from '../services/eventLogs.service'

export const useEventLogsStore = defineStore('eventLogs', () => {
  // State
  const eventLogs = ref<EventLog[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchEventLogs(): Promise<EventLog[]> {
    isLoading.value = true
    error.value = null

    try {
      const data = await fetchEventLogsApi()
      eventLogs.value = data
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
        error.value = 'Failed to fetch recent activity. Please try again.'
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
    eventLogs,
    isLoading,
    error,
    // Actions
    fetchEventLogs,
    clearError,
  }
})
