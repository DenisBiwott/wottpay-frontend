<template>
  <div class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
    <div class="flex justify-between items-start mb-3">
      <div>
        <p class="text-sm font-medium text-gray-900">{{ request.merchantRef }}</p>
        <p class="text-xs text-gray-500 mt-1">{{ humanReadableDate(request.createdAt) }}</p>
      </div>
      <PaymentRequestActions
        :redirect-url="request.redirectUrl"
        :can-cancel="canCancel(request.status)"
        :is-cancelling="isCancelling"
        @copy-url="copyPaymentUrl(request.redirectUrl)"
        @cancel="cancelRequest(request.trackingId)"
      />
    </div>

    <div class="space-y-2">
      <div class="flex justify-between">
        <span class="text-sm text-gray-500">Amount</span>
        <span class="text-sm font-medium text-gray-900">
          {{ formatCurrency(request.amount, request.currency) }}
        </span>
      </div>

      <div class="flex justify-between">
        <span class="text-sm text-gray-500">Currency</span>
        <span class="text-sm text-gray-900">{{ request.currency }}</span>
      </div>

      <div class="flex justify-between items-center">
        <span class="text-sm text-gray-500">Status</span>
        <Badge :variant="getStatusVariant(request.status)">
          {{ request.status }}
        </Badge>
      </div>

      <div v-if="request.description" class="pt-2 border-t border-gray-100">
        <p class="text-xs text-gray-500">Description</p>
        <p class="text-sm text-gray-900 truncate">{{ request.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Badge } from '@/components/ui'
import PaymentRequestActions from './PaymentRequestActions.vue'
import { formatCurrency, humanReadableDate } from '@/core/utils/formatting'
import type { PaymentRequest, PaymentRequestStatus } from '../types/paymentRequests.types'

defineProps<{
  request: PaymentRequest
  isCancelling: boolean
  getStatusVariant: (
    status: PaymentRequestStatus,
  ) => 'success' | 'warning' | 'error' | 'info' | 'default'
  canCancel: (status: PaymentRequestStatus) => boolean
  copyPaymentUrl: (url: string) => void
  cancelRequest: (trackingId: string) => void
}>()
</script>
