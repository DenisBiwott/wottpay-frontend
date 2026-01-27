<template>
  <Dropdown ref="dropdownRef" align="right" width="w-52">
    <template #trigger>
      <button
        type="button"
        class="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <EllipsisVerticalIcon class="w-5 h-5 text-gray-500" />
      </button>
    </template>

    <DropdownItem v-if="isCompleted" @click="handleViewDetails">
      <template #icon>
        <EyeIcon class="w-4 h-4" />
      </template>
      View Transaction
    </DropdownItem>

    <DropdownItem @click="handleCopyUrl">
      <template #icon>
        <CopyIcon class="w-4 h-4" />
      </template>
      Copy payment URL
    </DropdownItem>

    <DropdownItem v-if="canCancel" @click="handleCancel" :disabled="isCancelling">
      <template #icon>
        <BanIcon class="w-4 h-4" />
      </template>
      {{ isCancelling ? 'Cancelling...' : 'Recall/Cancel' }}
    </DropdownItem>
  </Dropdown>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dropdown, DropdownItem } from '@/components/ui'
import { EllipsisVerticalIcon, CopyIcon, BanIcon, EyeIcon } from '@/components/icons'

defineProps<{
  redirectUrl: string
  canCancel: boolean
  isCancelling: boolean
  isCompleted: boolean
  paymentRequestId: string
}>()

const emit = defineEmits<{
  copyUrl: []
  cancel: []
  viewDetails: [paymentRequestId: string]
}>()

const dropdownRef = ref<InstanceType<typeof Dropdown> | null>(null)

function handleCopyUrl() {
  emit('copyUrl')
  dropdownRef.value?.close()
}

function handleCancel() {
  emit('cancel')
  dropdownRef.value?.close()
}

function handleViewDetails() {
  emit('viewDetails', '')
  dropdownRef.value?.close()
}
</script>
