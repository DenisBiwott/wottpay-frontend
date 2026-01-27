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
        <option value="0">Pending</option>
        <option value="1">Completed</option>
        <option value="2">Failed</option>
        <option value="3">Reversed</option>
      </select>
    </div>

    <!-- Start Date -->
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">Start Date</label>
      <input
        v-model="localFilters.startDate"
        type="date"
        class="px-3 py-0.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent h-8"
      />
    </div>

    <!-- End Date -->
    <div class="flex flex-col">
      <label class="text-sm font-medium text-gray-700 mb-1">End Date</label>
      <input
        v-model="localFilters.endDate"
        type="date"
        class="px-3 py-0.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent h-8"
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
import type { TransactionFilters, TransactionStatusCode } from '../types/transactions.types'

const props = defineProps<{
  filters: TransactionFilters
  hasActiveFilters: boolean
}>()

const emit = defineEmits<{
  'update:filters': [filters: TransactionFilters]
  clear: []
}>()

const localFilters = reactive<{
  status: string
  startDate: string
  endDate: string
}>({
  status: props.filters.status !== undefined ? String(props.filters.status) : '',
  // startDate: First day of the month
  startDate:
    props.filters.startDate || new Date(new Date().setDate(1)).toISOString().split('T')[0] || '',
  // endDate: Today
  endDate: props.filters.endDate || new Date().toISOString().split('T')[0] || '',
})

watch(
  () => props.filters,
  (newFilters) => {
    localFilters.status = newFilters.status !== undefined ? String(newFilters.status) : ''
    localFilters.startDate = newFilters.startDate || ''
    localFilters.endDate = newFilters.endDate || ''
  },
)

function handleApplyFilters() {
  const filters: TransactionFilters = {}

  if (localFilters.status !== '') {
    filters.status = Number(localFilters.status) as TransactionStatusCode
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
