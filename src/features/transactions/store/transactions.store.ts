// Transactions store
import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import type { Transaction, TransactionFilters } from '../types/transactions.types'
import { fetchTransactionsApi } from '../services/transactions.service'

export const useTransactionsStore = defineStore('transactions', () => {
  // State
  const transactions = ref<Transaction[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<TransactionFilters>({})

  // Actions
  async function fetchTransactions(filterParams?: TransactionFilters): Promise<Transaction[]> {
    isLoading.value = true
    error.value = null

    if (filterParams) {
      filters.value = filterParams
    }

    try {
      const data = await fetchTransactionsApi(filterParams)
      transactions.value = data
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
        error.value = 'Failed to fetch transactions. Please try again.'
      }
      throw err
    } finally {
      isLoading.value = false
    }
  }

  function setFilters(newFilters: TransactionFilters) {
    filters.value = newFilters
  }

  function clearFilters() {
    filters.value = {}
  }

  function clearError() {
    error.value = null
  }

  return {
    // State
    transactions,
    isLoading,
    error,
    filters,
    // Actions
    fetchTransactions,
    setFilters,
    clearFilters,
    clearError,
  }
})
