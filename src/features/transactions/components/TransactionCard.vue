<template>
  <div class="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
    <div class="flex justify-between items-start">
      <div>
        <p class="text-sm font-medium text-gray-900">{{ transaction.paymentMethod }}</p>
        <p class="text-xs text-gray-500">{{ formatDate(transaction.createdAt) }}</p>
      </div>
      <Badge :variant="getStatusVariant(transaction.statusCode)">
        {{ getStatusLabel(transaction.statusCode) }}
      </Badge>
    </div>

    <div class="flex justify-between items-center pt-2 border-t border-gray-100">
      <div>
        <p class="text-xs text-gray-500">Reference</p>
        <p class="text-sm text-gray-900 font-mono">{{ transaction.confirmationCode }}</p>
      </div>
      <div class="text-right">
        <p class="text-xs text-gray-500">Amount</p>
        <p class="text-sm font-semibold text-gray-900">
          {{ formatCurrency(transaction.amount, transaction.currency) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui'
import type { Transaction, TransactionStatusCode } from '../types/transactions.types'

defineProps<{
  transaction: Transaction
  getStatusLabel: (status: TransactionStatusCode) => string
  getStatusVariant: (
    status: TransactionStatusCode,
  ) => 'success' | 'warning' | 'error' | 'info' | 'default'
  formatCurrency: (amount: number, currency: string) => string
  formatDate: (date: string) => string
}>()
</script>
