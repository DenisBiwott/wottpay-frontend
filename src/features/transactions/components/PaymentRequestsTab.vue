<template>
  <div class="mt-6">
    <!-- Error State -->
    <Alert v-if="error" variant="error" class="mb-4">
      {{ error }}
      <button @click="clearError" class="ml-2 underline">Dismiss</button>
    </Alert>

    <!-- Loading State -->
    <div v-if="isLoading" class="flex justify-center items-center py-12">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>

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
            d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
          />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No payment requests</h3>
      <p class="mt-1 text-sm text-gray-500">Get started by creating a new payment request.</p>
    </div>

    <!-- Table -->
    <PaymentRequestsTable
      v-else
      :payment-requests="paymentRequests"
      :is-cancelling="isCancelling"
      :get-status-variant="getStatusVariant"
      :can-cancel="canCancel"
      :copy-payment-url="copyPaymentUrl"
      :cancel-request="cancelRequest"
    />
  </div>
</template>

<script setup lang="ts">
import { Alert } from '@/components/ui'
import PaymentRequestsTable from './PaymentRequestsTable.vue'
import { usePaymentRequests } from '../composables/usePaymentRequests'

const {
  paymentRequests,
  isLoading,
  error,
  isCancelling,
  isEmpty,
  cancelRequest,
  copyPaymentUrl,
  getStatusVariant,
  canCancel,
  clearError,
} = usePaymentRequests()
</script>
