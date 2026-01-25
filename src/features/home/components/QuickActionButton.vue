<template>
  <button
    type="button"
    :class="[
      'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-normal transition-colors whitespace-nowrap cursor-pointer',
      variantClasses,
    ]"
    @click="$emit('click')"
  >
    <span class="w-4 h-4 shrink-0">
      <slot name="icon"></slot>
    </span>
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    variant?: 'primary' | 'outline'
  }>(),
  {
    variant: 'primary',
  },
)

defineEmits<{
  click: []
}>()

const variantClasses = computed(() => {
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-hover font-medium',
    outline: 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
  }
  return variants[props.variant]
})
</script>
