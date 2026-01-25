<template>
  <button
    type="button"
    :class="[
      'flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700',
      'hover:bg-gray-100 hover:text-gray-900',
      'focus:outline-none focus:bg-gray-100',
      disabled && 'opacity-50 cursor-not-allowed',
    ]"
    :disabled="disabled"
    @click="handleClick"
  >
    <span v-if="$slots.icon" class="w-5 h-5 flex-shrink-0">
      <slot name="icon"></slot>
    </span>
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

function handleClick(event: MouseEvent) {
  emit('click', event)
}
</script>
