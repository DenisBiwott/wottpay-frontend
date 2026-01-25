<template>
  <div
    :class="[
      'flex items-center justify-center rounded-full bg-gray-500 text-white font-semibold',
      sizeClasses,
    ]"
  >
    <slot>{{ initials }}</slot>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    initials?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    initials: '',
    size: 'md',
  },
)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }
  return sizes[props.size]
})
</script>
