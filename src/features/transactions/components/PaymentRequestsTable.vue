<template>
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
            @copy-url="copyPaymentUrl(request.redirectUrl)"
            @cancel="cancelRequest(request.trackingId)"
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
      />
    </template>
  </Table>
</template>

<script setup lang="ts">
import { Table, TableRow, TableCell, Badge } from '@/components/ui'
import PaymentRequestActions from './PaymentRequestActions.vue'
import PaymentRequestCard from './PaymentRequestCard.vue'
import { formatCurrency, humanReadableDate } from '@/core/utils/formatting'
import type { PaymentRequest, PaymentRequestStatus } from '../types/paymentRequests.types'

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
</script>
