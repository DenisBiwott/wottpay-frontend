// Transactions composable
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useTransactionsStore } from '../store/transactions.store'
import type {
  TransactionStatusCode,
  TransactionFilters,
  TransactionStatus,
} from '../types/transactions.types'
import { TransactionStatusMap } from '../types/transactions.types'

export function useTransactions() {
  const transactionsStore = useTransactionsStore()

  const { transactions, isLoading, error, filters } = storeToRefs(transactionsStore)

  const isEmpty = computed(() => !isLoading.value && transactions.value.length === 0)

  const hasActiveFilters = computed(() => {
    return !!(
      filters.value.status !== undefined ||
      filters.value.startDate ||
      filters.value.endDate
    )
  })

  async function loadTransactions(filterParams?: TransactionFilters) {
    try {
      await transactionsStore.fetchTransactions(filterParams)
    } catch {
      // Error is handled in store
    }
  }

  async function applyFilters(newFilters: TransactionFilters) {
    transactionsStore.setFilters(newFilters)
    await loadTransactions(newFilters)
  }

  async function clearFilters() {
    transactionsStore.clearFilters()
    await loadTransactions({})
  }

  function getStatusLabel(statusCode: TransactionStatusCode): TransactionStatus {
    return TransactionStatusMap[statusCode]
  }

  function getStatusVariant(
    statusCode: TransactionStatusCode,
  ): 'success' | 'warning' | 'error' | 'info' | 'default' {
    const status = TransactionStatusMap[statusCode]
    const variants: Record<TransactionStatus, 'success' | 'warning' | 'error' | 'info' | 'default'> =
      {
        PENDING: 'warning',
        COMPLETED: 'success',
        FAILED: 'error',
        REVERSED: 'info',
      }
    return variants[status]
  }

  function formatCurrency(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  onMounted(() => {
    loadTransactions()
  })

  return {
    // State
    transactions,
    isLoading,
    error,
    isEmpty,
    filters,
    hasActiveFilters,
    // Actions
    loadTransactions,
    applyFilters,
    clearFilters,
    // Helpers
    getStatusLabel,
    getStatusVariant,
    formatCurrency,
    formatDate,
    clearError: transactionsStore.clearError,
  }
}
