<template>
  <div class="flex flex-wrap gap-4 mb-6">
    <!-- Status Filter -->
    <div class="flex flex-col ml-0.5">
      <label class="text-sm font-medium text-gray-700 mb-1">Status</label>
      <select
        v-model="localFilters.status"
        class="px-3 py-0.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent h-8"
      >
        <option value="">All</option>
        <option value="ACTIVE">Active</option>
        <option value="COMPLETED">Completed</option>
        <option value="FAILED">Failed</option>
        <option value="RECALLED">Recalled</option>
      </select>
    </div>

    <!-- Start Date -->
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">From Date</label>
      <input
        v-model="localFilters.startDate"
        type="date"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent h-8"
      />
    </div>

    <!-- End Date -->
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">To Date</label>
      <input
        v-model="localFilters.endDate"
        type="date"
        class="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent h-8"
      />
    </div>

    <!-- Filter Actions -->
    <div class="flex items-end gap-2">
      <Button size="sm" @click="handleApplyFilters">Apply Filters</Button>
      <Button v-if="hasActiveFilters" variant="ghost" size="sm" @click="handleClearFilters">
        Clear
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { Button } from '@/components/ui'
import type { PaymentRequestFilters, PaymentRequestStatus } from '../types/paymentRequests.types'

const props = defineProps<{
  filters: PaymentRequestFilters
  hasActiveFilters: boolean
}>()

const emit = defineEmits<{
  'update:filters': [filters: PaymentRequestFilters]
  clear: []
}>()

const localFilters = reactive<{
  status: PaymentRequestStatus | ''
  startDate: string
  endDate: string
}>({
  status: props.filters.status || '',
  // startDate: First day of the month
  startDate:
    props.filters.startDate || new Date(new Date().setDate(1)).toISOString().split('T')[0] || '',
  // endDate: Today
  endDate: props.filters.endDate || new Date().toISOString().split('T')[0] || '',
})

watch(
  () => props.filters,
  (newFilters) => {
    localFilters.status = newFilters.status || ''
    localFilters.startDate = newFilters.startDate || ''
    localFilters.endDate = newFilters.endDate || ''
  },
)

function handleApplyFilters() {
  const filters: PaymentRequestFilters = {}

  if (localFilters.status) {
    filters.status = localFilters.status
  }
  if (localFilters.startDate) {
    filters.startDate = localFilters.startDate
  }
  if (localFilters.endDate) {
    filters.endDate = localFilters.endDate
  }

  emit('update:filters', filters)
}

function handleClearFilters() {
  localFilters.status = ''
  localFilters.startDate = ''
  localFilters.endDate = ''
  emit('clear')
}
</script>
