<template>
  <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
    <p class="text-sm text-gray-500 mb-1">{{ title }}</p>
    <p class="text-3xl font-normal text-gray-900 my-2">{{ formattedValue }}</p>
    <p v-if="subtitle" class="text-xs text-gray-400 mt-1">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    title: string
    value: number | string
    subtitle?: string
    isCurrency?: boolean
    currencyCode?: string
  }>(),
  {
    isCurrency: false,
    currencyCode: 'KES',
  },
)

const formattedValue = computed(() => {
  if (props.isCurrency && typeof props.value === 'number') {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: props.currencyCode,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(props.value)
  }
  return props.value
})
</script>
