<template>
  <div class="flex items-center gap-3 px-0 py-4">
    <img
      src="../../assets/wottpay-logo.jpg"
      alt="WottPay Logo"
      class="w-10 h-10 p-0.5 border border-slate-200 rounded-full"
    />
    <div class="flex-1 min-w-0">
      <p class="text-sm font-semibold text-gray-900 truncate">{{ businessName }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    businessName: string
  }>(),
  { businessName: 'Business Name' },
)

const businessInitials = computed(() => {
  if (!props.businessName) return '?'
  const words = props.businessName.split(' ').filter((w) => w.length > 0)
  if (words.length >= 2 && words[0] && words[1]) {
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase()
  }
  return props.businessName.slice(0, 2).toUpperCase()
})
</script>
