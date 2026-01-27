<template>
  <div class="mt-6">
    <!-- Filters -->
    <TransactionFilters
      :filters="filters"
      :has-active-filters="hasActiveFilters"
      @update:filters="applyFilters"
      @clear="clearFilters"
    />

    <!-- Error State -->
    <Alert v-if="error" variant="error" class="mb-4">
      {{ error }}
      <button @click="clearError" class="ml-2 underline">Dismiss</button>
    </Alert>

    <!-- Loading State -->
    <Loader v-if="isLoading" />

    <!-- Empty State -->
    <div v-else-if="isEmpty" class="text-center py-12">
      <div class="mx-auto h-12 w-12 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
          />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions</h3>
      <p class="mt-1 text-sm text-gray-500">
        {{ hasActiveFilters ? 'No transactions match your filters.' : 'Transactions will appear here once payments are made.' }}
      </p>
    </div>

    <!-- Table -->
    <TransactionsTable
      v-else
      :transactions="transactions"
      :get-status-label="getStatusLabel"
      :get-status-variant="getStatusVariant"
      :format-currency="formatCurrency"
      :format-date="formatDate"
    />
  </div>
</template>

<script setup lang="ts">
import { Alert, Loader } from '@/components/ui'
import TransactionsTable from './TransactionsTable.vue'
import TransactionFilters from './TransactionFilters.vue'
import { useTransactions } from '../composables/useTransactions'

const {
  transactions,
  isLoading,
  error,
  isEmpty,
  filters,
  hasActiveFilters,
  applyFilters,
  clearFilters,
  getStatusLabel,
  getStatusVariant,
  formatCurrency,
  formatDate,
  clearError,
} = useTransactions()
</script>
