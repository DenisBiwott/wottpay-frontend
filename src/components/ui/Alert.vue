<template>
  <div v-if="show" :class="['p-3 border rounded-lg text-sm', variantClasses]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    variant?: 'error' | 'success' | 'warning' | 'info'
    show?: boolean
  }>(),
  {
    variant: 'info',
    show: true,
  },
)

const variantClasses = computed(() => {
  const variants = {
    error: 'bg-red-50 border-red-200 text-red-600',
    success: 'bg-green-50 border-green-200 text-green-600',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-600',
    info: 'bg-blue-50 border-blue-200 text-blue-600',
  }
  return variants[props.variant]
})
</script>
