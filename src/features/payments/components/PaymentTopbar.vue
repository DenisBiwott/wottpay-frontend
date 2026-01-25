<template>
  <header class="bg-white border-b border-gray-200 px-4 py-3">
    <div class="flex items-center justify-between mx-auto">
      <!-- Logo and Business Name -->
      <div class="flex items-center gap-3">
        <img :src="logoUrl" alt="WottPay" class="h-8 w-8 rounded" />
        <span class="text-sm font-medium text-gray-700">{{ businessName }}</span>
      </div>

      <!-- Close Button -->
      <button
        type="button"
        class="p-2 rounded-full hover:bg-gray-100 transition-colors"
        @click="$emit('close')"
      >
        <CloseIcon class="h-5 w-5 text-gray-500 cursor-pointer" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { CloseIcon } from '@/components/icons'
import logoUrl from '@/assets/wottpay-logo.jpg'

defineProps<{
  businessName: string
}>()

defineEmits<{
  close: []
}>()
</script>
