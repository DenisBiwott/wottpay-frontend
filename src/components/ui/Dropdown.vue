<template>
  <div class="relative" ref="dropdownRef">
    <div @click="toggle">
      <slot name="trigger"></slot>
    </div>
    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        :class="[
          'absolute z-50 mt-2 rounded-lg bg-white shadow-lg border border-gray-200 focus:outline-none',
          alignmentClasses,
          widthClass,
        ]"
      >
        <div class="py-1">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = withDefaults(
  defineProps<{
    align?: 'left' | 'right'
    width?: string
  }>(),
  {
    align: 'right',
    width: 'w-48',
  },
)

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const alignmentClasses = computed(() => {
  return props.align === 'left' ? 'left-0 origin-top-left' : 'right-0 origin-top-right'
})

const widthClass = computed(() => props.width)

function toggle() {
  isOpen.value = !isOpen.value
}

function close() {
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})

defineExpose({ isOpen, toggle, close })
</script>
