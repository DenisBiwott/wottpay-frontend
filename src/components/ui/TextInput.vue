<template>
  <div class="relative">
    <label
      :for="id"
      :class="[
        'absolute left-3 transition-all duration-200 pointer-events-none',
        isFocused || modelValue ? '-top-2.5 text-xs bg-white px-1' : 'top-3 text-sm',
        isFocused ? 'text-primary' : 'text-gray-500',
      ]"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :value="modelValue"
      :type="computedType"
      :required="required"
      :autocomplete="autocomplete"
      :disabled="disabled"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="isFocused = true"
      @blur="isFocused = false"
      :class="[
        'w-full px-3 py-3 border rounded-lg outline-none transition-colors',
        hasToggle ? 'pr-10' : '',
        isFocused ? 'border-primary ring-1 ring-primary' : 'border-gray-300',
        disabled ? 'bg-gray-100 cursor-not-allowed' : '',
      ]"
    />
    <button
      v-if="hasToggle"
      type="button"
      @click="isToggled = !isToggled"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
      <slot name="toggle-icon" :toggled="isToggled">
        <!-- Default eye icons for password toggle -->
        <svg
          v-if="!isToggled"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      </slot>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    id: string
    label: string
    modelValue: string
    type?: 'text' | 'email' | 'password' | 'number' | 'tel'
    required?: boolean
    autocomplete?: string
    disabled?: boolean
    hasToggle?: boolean
  }>(),
  {
    type: 'text',
    required: false,
    autocomplete: 'off',
    disabled: false,
    hasToggle: false,
  },
)

defineEmits<{
  'update:modelValue': [value: string]
}>()

const isFocused = ref(false)
const isToggled = ref(false)

const computedType = computed(() => {
  if (props.hasToggle && props.type === 'password') {
    return isToggled.value ? 'text' : 'password'
  }
  return props.type
})
</script>
