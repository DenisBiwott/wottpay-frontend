<template>
  <Transition
    enter-active-class="transition ease-out duration-300"
    enter-from-class="transform translate-y-2 opacity-0"
    enter-to-class="transform translate-y-0 opacity-100"
    leave-active-class="transition ease-in duration-200"
    leave-from-class="transform translate-y-0 opacity-100"
    leave-to-class="transform translate-y-2 opacity-0"
  >
    <div
      v-if="visible"
      :class="['flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg', variantClasses]"
    >
      <span class="text-sm font-medium">{{ message }}</span>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  message: string
  variant: 'success' | 'error' | 'warning' | 'info'
  visible: boolean
}>()

const variantClasses = computed(() => {
  const variants = {
    success: 'bg-primary text-white',
    error: 'bg-red-600 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-600 text-white',
  }
  return variants[props.variant]
})
</script>
