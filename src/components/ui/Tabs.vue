<template>
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        type="button"
        :class="[
          'whitespace-nowrap border-b-2 py-3 px-1 text-sm font-medium transition-colors cursor-pointer',
          modelValue === tab.value
            ? 'border-primary-500 text-primary'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
        ]"
        @click="emit('update:modelValue', tab.value)"
      >
        {{ tab.label }}
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
export interface Tab {
  label: string
  value: string
}

defineProps<{
  tabs: Tab[]
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()
</script>
