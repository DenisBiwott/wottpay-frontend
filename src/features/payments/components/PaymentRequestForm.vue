<template>
  <form @submit.prevent="$emit('submit')" class="space-y-6">
    <!-- Error Alert -->
    <Alert v-if="error" variant="error" :show="!!error">
      {{ error }}
    </Alert>

    <span class="text-slate-500 text-xs flex items-center gap-1" v-if="!hasValidContact && !error">
      <InfoOutlineIcon class="h-4 w-4" /> Please provide either an email or phone number for the
      customer.
    </span>

    <!-- Amount -->
    <TextInput
      id="amount"
      :model-value="form.amount"
      label="Amount"
      type="number"
      required
      autocomplete="off"
      @update:model-value="$emit('update:form', { ...form, amount: $event })"
    />

    <!-- Currency (disabled) -->
    <TextInput id="currency" :model-value="form.currency" label="Currency" type="text" disabled />

    <!-- Description -->
    <TextInput
      id="description"
      :model-value="form.description"
      label="Description"
      type="text"
      required
      autocomplete="off"
      @update:model-value="$emit('update:form', { ...form, description: $event })"
    />

    <!-- Email Address -->
    <TextInput
      id="emailAddress"
      :model-value="form.emailAddress"
      label="Email Address"
      type="email"
      autocomplete="email"
      @update:model-value="$emit('update:form', { ...form, emailAddress: $event })"
    />

    <!-- Phone Number -->
    <TextInput
      id="phoneNumber"
      :model-value="form.phoneNumber"
      label="Phone Number"
      type="tel"
      autocomplete="tel"
      @update:model-value="$emit('update:form', { ...form, phoneNumber: $event })"
    />

    <!-- First Name -->
    <TextInput
      id="firstName"
      :model-value="form.firstName"
      label="First Name"
      type="text"
      autocomplete="given-name"
      @update:model-value="$emit('update:form', { ...form, firstName: $event })"
    />

    <!-- Last Name -->
    <TextInput
      id="lastName"
      :model-value="form.lastName"
      label="Last Name"
      type="text"
      autocomplete="family-name"
      @update:model-value="$emit('update:form', { ...form, lastName: $event })"
    />

    <!-- Submit Button -->
    <Button
      type="submit"
      variant="primary"
      size="md"
      full-width
      :loading="isSubmitting"
      :disabled="!canSubmit || isLoadingIPN"
    >
      {{ isSubmitting ? 'Creating...' : 'Create Payment Request' }}
    </Button>
  </form>
</template>

<script setup lang="ts">
import { TextInput, Button, Alert } from '@/components/ui'
import type { PaymentRequestFormState } from '../types/payments.types'
import InfoOutlineIcon from '@/components/icons/InfoOutlineIcon.vue'

defineProps<{
  form: PaymentRequestFormState
  isLoadingIPN: boolean
  isSubmitting: boolean
  error: string | null
  hasValidContact: boolean
  canSubmit: boolean
}>()

defineEmits<{
  submit: []
  'update:form': [value: PaymentRequestFormState]
}>()
</script>
