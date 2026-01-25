<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
    <Toast
      v-for="toast in toasts"
      :key="toast.id"
      :message="toast.message"
      :variant="toast.variant"
      :visible="true"
    />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useToastStore } from '@/core/stores/toast.store'
import Toast from './Toast.vue'

const toastStore = useToastStore()
const { toasts } = storeToRefs(toastStore)
</script>
