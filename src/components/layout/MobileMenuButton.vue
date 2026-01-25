<template>
  <button
    type="button"
    class="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
    @click="$emit('toggle')"
  >
    <span class="sr-only">{{ isOpen ? 'Close menu' : 'Open menu' }}</span>
    <CloseIcon v-if="isOpen" class="w-6 h-6" />
    <MenuIcon v-else class="w-6 h-6" />
  </button>
</template>

<script setup lang="ts">
import { MenuIcon, CloseIcon } from '@/components/icons'

defineProps<{
  isOpen: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>
