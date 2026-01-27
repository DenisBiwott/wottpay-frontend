<template>
  <!-- Desktop Table -->
  <Table class="hidden md:block">
    <template #header>
      <TableRow is-header>
        <TableCell is-header>Date</TableCell>
        <TableCell is-header>Description</TableCell>
        <TableCell is-header>Reference</TableCell>
        <TableCell is-header>Amount</TableCell>
        <TableCell is-header>Currency</TableCell>
        <TableCell is-header>Status</TableCell>
      </TableRow>
    </template>

    <template #body>
      <TableRow v-for="transaction in transactions" :key="transaction.id">
        <TableCell>{{ formatDate(transaction.createdAt) }}</TableCell>
        <TableCell>{{ transaction.description }}</TableCell>
        <TableCell class="font-mono text-sm">{{ transaction.reference }}</TableCell>
        <TableCell class="font-semibold">
          {{ formatCurrency(transaction.amount, transaction.currency) }}
        </TableCell>
        <TableCell>{{ transaction.currency }}</TableCell>
        <TableCell>
          <Badge :variant="getStatusVariant(transaction.status)">
            {{ getStatusLabel(transaction.status) }}
          </Badge>
        </TableCell>
      </TableRow>
    </template>
  </Table>

  <!-- Mobile Cards -->
  <div class="md:hidden space-y-3">
    <TransactionCard
      v-for="transaction in transactions"
      :key="transaction.id"
      :transaction="transaction"
      :get-status-label="getStatusLabel"
      :get-status-variant="getStatusVariant"
      :format-currency="formatCurrency"
      :format-date="formatDate"
    />
  </div>
</template>

<script setup lang="ts">
import { Table, TableRow, TableCell, Badge } from '@/components/ui'
import TransactionCard from './TransactionCard.vue'
import type { Transaction, TransactionStatusCode } from '../types/transactions.types'

defineProps<{
  transactions: Transaction[]
  getStatusLabel: (status: TransactionStatusCode) => string
  getStatusVariant: (status: TransactionStatusCode) => 'success' | 'warning' | 'error' | 'info' | 'default'
  formatCurrency: (amount: number, currency: string) => string
  formatDate: (date: string) => string
}>()
</script>
