<template>
  <component :is="isHeader ? 'th' : 'td'" :class="cellClasses">
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    isHeader?: boolean
    align?: 'left' | 'center' | 'right'
  }>(),
  {
    isHeader: false,
    align: 'left',
  },
)

const cellClasses = computed(() => {
  const base = props.isHeader
    ? 'px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider'
    : 'px-4 py-4 text-sm text-gray-900 whitespace-nowrap'

  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return [base, alignment[props.align]]
})
</script>
