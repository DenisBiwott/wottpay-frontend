<template>
  <Modal
    :model-value="isOpen"
    @update:model-value="$emit('update:isOpen', $event)"
    title="Transaction Details"
    size="md"
  >
    <!-- Loading State -->
    <Loader v-if="isLoading" container-class="py-8" />

    <!-- Error State -->
    <Alert v-else-if="error" variant="error">
      {{ error }}
      <button @click="clearError" class="ml-2 underline">Dismiss</button>
    </Alert>

    <!-- No Transaction -->
    <div v-else-if="!hasTransaction" class="py-8 text-center">
      <p class="text-sm text-gray-500">
        No transaction details available for this payment request.
      </p>
    </div>

    <!-- Transaction Details -->
    <div v-else class="space-y-4">
      <!-- Payment Request Info -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-sm font-medium text-gray-900 mb-3">Payment Request</h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Reference</span>
            <span class="text-sm text-gray-900 max-w-48 truncate">{{
              paymentRequest?.merchantRef
            }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Description</span>
            <span class="text-sm text-gray-900 max-w-48 truncate">
              {{ paymentRequest?.description || '-' }}
            </span>
          </div>
        </div>
      </div>

      <!-- Transaction Info -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h4 class="text-sm font-medium text-gray-900 mb-3">Transaction</h4>
        <div class="space-y-2">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Channel</span>
            <span class="text-sm text-gray-900">{{ transaction?.paymentMethod }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Provider Reference</span>
            <span class="text-sm text-gray-900">{{ transaction?.confirmationCode }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Status</span>
            <Badge variant="success">{{ transaction?.statusMessage }}</Badge>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Amount</span>
            <span class="text-sm text-gray-900">
              {{
                formatTransactionAmount(transaction?.amount ?? 0, transaction?.currency ?? 'KES')
              }}
            </span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Currency</span>
            <span class="text-sm text-gray-900">{{ transaction?.currency }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Recipient</span>
            <span class="text-sm text-gray-900">{{ transaction?.paymentAccount }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500">Processed At</span>
            <span class="text-sm text-gray-900">
              {{ formatTransactionDate(transaction?.createdAt ?? '') }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <Button size="sm" variant="secondary" @click="closeModal">Close</Button>
      </div>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Modal, Alert, Button, Loader, Badge } from '@/components/ui'
import type {
  PaymentRequestWithTransaction,
  PaymentRequestTransaction,
} from '../types/paymentRequests.types'

defineProps<{
  isOpen: boolean
  isLoading: boolean
  error: string | null
  paymentRequest: PaymentRequestWithTransaction | null
  hasTransaction: boolean
  transaction: PaymentRequestTransaction | undefined
  formatTransactionAmount: (amount: number, currency: string) => string
  formatTransactionDate: (date: string) => string
}>()

const emit = defineEmits<{
  'update:isOpen': [value: boolean]
  close: []
  clearError: []
}>()

function closeModal() {
  emit('update:isOpen', false)
  emit('close')
}

function clearError() {
  emit('clearError')
}
</script>
