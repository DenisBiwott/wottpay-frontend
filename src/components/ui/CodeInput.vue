<template>
  <div class="flex justify-center gap-2 sm:gap-3">
    <input
      v-for="(_, index) in length"
      :key="index"
      ref="inputRefs"
      type="text"
      inputmode="numeric"
      maxlength="1"
      :value="digits[index]"
      :disabled="disabled"
      @input="handleInput(index, $event)"
      @keydown="handleKeydown(index, $event)"
      @paste="handlePaste"
      @focus="handleFocus(index)"
      :class="[
        'w-10 h-12 sm:w-12 sm:h-14 text-center text-xl sm:text-2xl font-light',
        'border rounded-lg outline-none transition-all duration-200',
        'focus:border-primary focus:ring-2 focus:ring-primary/20',
        disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white',
        hasError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300',
      ]"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: string
    length?: number
    disabled?: boolean
    hasError?: boolean
  }>(),
  {
    length: 6,
    disabled: false,
    hasError: false,
  },
)

const emit = defineEmits<{
  'update:modelValue': [value: string]
  complete: [value: string]
}>()

const inputRefs = ref<HTMLInputElement[]>([])
const digits = ref<string[]>(Array(props.length).fill(''))

watch(
  () => props.modelValue,
  (newValue) => {
    const chars = newValue.split('').slice(0, props.length)
    digits.value = [...chars, ...Array(props.length - chars.length).fill('')]
  },
  { immediate: true },
)

function updateValue() {
  const value = digits.value.join('')
  emit('update:modelValue', value)
  if (value.length === props.length && !value.includes(' ')) {
    emit('complete', value)
  }
}

function handleInput(index: number, event: Event) {
  const input = event.target as HTMLInputElement
  const value = input.value.replace(/\D/g, '')

  if (value && value.length > 0) {
    digits.value[index] = value.charAt(0)
    updateValue()

    if (index < props.length - 1) {
      nextTick(() => {
        inputRefs.value[index + 1]?.focus()
      })
    }
  }
}

function handleKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace') {
    if (digits.value[index]) {
      digits.value[index] = ''
      updateValue()
    } else if (index > 0) {
      nextTick(() => {
        inputRefs.value[index - 1]?.focus()
      })
    }
  } else if (event.key === 'ArrowLeft' && index > 0) {
    inputRefs.value[index - 1]?.focus()
  } else if (event.key === 'ArrowRight' && index < props.length - 1) {
    inputRefs.value[index + 1]?.focus()
  }
}

function handlePaste(event: ClipboardEvent) {
  event.preventDefault()
  const pastedData = event.clipboardData?.getData('text').replace(/\D/g, '') || ''
  const chars = pastedData.split('').slice(0, props.length)

  chars.forEach((char, i) => {
    digits.value[i] = char
  })

  updateValue()

  const focusIndex = Math.min(chars.length, props.length - 1)
  nextTick(() => {
    inputRefs.value[focusIndex]?.focus()
  })
}

function handleFocus(index: number) {
  inputRefs.value[index]?.select()
}

function focus() {
  inputRefs.value[0]?.focus()
}

function clear() {
  digits.value = Array(props.length).fill('')
  updateValue()
  focus()
}

defineExpose({ focus, clear })
</script>
