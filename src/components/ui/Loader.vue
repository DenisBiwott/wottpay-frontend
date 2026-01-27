<template>
  <div :class="['flex justify-center items-center', containerClass]">
    <div :class="['animate-spin rounded-full border-b-2 border-primary', sizeClasses]"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg'
    containerClass?: string
  }>(),
  {
    size: 'md',
    containerClass: 'py-12',
  }
)

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  }
  return sizes[props.size]
})
</script>
