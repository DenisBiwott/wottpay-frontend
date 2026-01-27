// People store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Person } from '../types/people.types'
import { fetchPeopleApi } from '../services/people.service'

export const usePeopleStore = defineStore('people', () => {
  // State
  const people = ref<Person[]>([])
  const total = ref(0)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Actions
  async function fetchPeople(): Promise<Person[]> {
    isLoading.value = true
    error.value = null

    try {
      const data = await fetchPeopleApi()
      people.value = data.data
      total.value = data.total
      return data.data
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        if (Array.isArray(errorMessage)) {
          error.value = errorMessage.join(' ')
        } else {
          error.value = errorMessage
        }
      } else {
        error.value = 'Failed to fetch users. Please try again.'
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
    people,
    total,
    isLoading,
    error,
    // Actions
    fetchPeople,
    clearError,
  }
})
