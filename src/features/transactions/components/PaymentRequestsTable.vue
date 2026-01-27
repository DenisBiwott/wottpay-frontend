<template>
  <div>
    <Table>
      <template #header>
        <TableCell is-header>Date</TableCell>
        <TableCell is-header>Description</TableCell>
        <TableCell is-header>Reference</TableCell>
        <TableCell is-header>Amount</TableCell>
        <TableCell is-header>Currency</TableCell>

        <TableCell is-header>Status</TableCell>

        <TableCell is-header align="right">Actions</TableCell>
      </template>

      <template #body>
        <TableRow v-for="request in paymentRequests" :key="request.id">
          <TableCell
            ><span>{{ humanReadableDate(request.createdAt) }}</span></TableCell
          >
          <TableCell>
            <span class="max-w-50 truncate block">
              {{ request.description || '-' }}
            </span>
          </TableCell>
          <TableCell>
            <span class="max-w-30 truncate block">
              {{ request.merchantRef }}
            </span>
          </TableCell>
          <TableCell>{{ formatCurrency(request.amount, request.currency) }}</TableCell>
          <TableCell>{{ request.currency }}</TableCell>

          <TableCell>
            <Badge :variant="getStatusVariant(request.status)">
              {{ request.status }}
            </Badge>
          </TableCell>

          <TableCell align="right">
            <PaymentRequestActions
              :redirect-url="request.redirectUrl"
              :can-cancel="canCancel(request.status)"
              :is-cancelling="isCancelling"
              :is-completed="request.status === 'COMPLETED'"
              :payment-request-id="request.id"
              @copy-url="copyPaymentUrl(request.redirectUrl)"
              @cancel="cancelRequest(request.trackingId)"
              @view-details="handleViewDetails(request.id)"
            />
          </TableCell>
        </TableRow>
      </template>

      <template #mobile>
        <PaymentRequestCard
          v-for="request in paymentRequests"
          :key="request.id"
          :request="request"
          :is-cancelling="isCancelling"
          :get-status-variant="getStatusVariant"
          :can-cancel="canCancel"
          :copy-payment-url="copyPaymentUrl"
          :cancel-request="cancelRequest"
          :handle-view-details="handleViewDetails"
        />
      </template>
    </Table>

    <!-- Transaction Details Modal -->
    <TransactionDetailsModal
      :is-open="transactionDetails.isOpen.value"
      :is-loading="transactionDetails.isLoading.value"
      :error="transactionDetails.error.value"
      :payment-request="transactionDetails.paymentRequest.value"
      :has-transaction="transactionDetails.hasTransaction.value"
      :transaction="transactionDetails.transaction.value"
      :format-transaction-amount="transactionDetails.formatTransactionAmount"
      :format-transaction-date="transactionDetails.formatTransactionDate"
      @update:is-open="transactionDetails.isOpen.value = $event"
      @close="transactionDetails.closeModal"
      @clear-error="transactionDetails.clearError"
    />
  </div>
</template>

<script setup lang="ts">
import { Table, TableRow, TableCell, Badge } from '@/components/ui'
import PaymentRequestActions from './PaymentRequestActions.vue'
import PaymentRequestCard from './PaymentRequestCard.vue'
import TransactionDetailsModal from './TransactionDetailsModal.vue'
import { formatCurrency, humanReadableDate } from '@/core/utils/formatting'
import type { PaymentRequest, PaymentRequestStatus } from '../types/paymentRequests.types'
import { useTransactionDetails } from '../composables/useTransactionDetails'

defineProps<{
  paymentRequests: PaymentRequest[]
  isCancelling: boolean
  getStatusVariant: (
    status: PaymentRequestStatus,
  ) => 'success' | 'warning' | 'error' | 'info' | 'default'
  canCancel: (status: PaymentRequestStatus) => boolean
  copyPaymentUrl: (url: string) => void
  cancelRequest: (trackingId: string) => void
}>()

const transactionDetails = useTransactionDetails()

function handleViewDetails(paymentRequestId: string) {
  transactionDetails.openModal(paymentRequestId)
}
</script>
