<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Topbar -->
    <PaymentTopbar :business-name="businessName" @close="handleClose" class="min-h-16" />

    <!-- Form Content -->
    <div class="flex-1 flex items-start justify-center px-4 py-8">
      <div class="w-full max-w-md">
        <div class="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
          <div class="text-xl font-normal text-gray-900">Request Payment</div>
          <PaymentRequestForm
            :form="form"
            :is-loading-i-p-n="isLoadingIPN"
            :is-submitting="isSubmitting"
            :error="error"
            :has-valid-contact="hasValidContact"
            :can-submit="canSubmit"
            @submit="submitPaymentRequest"
            @update:form="updateForm"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PaymentTopbar from '@/features/payments/components/PaymentTopbar.vue'
import PaymentRequestForm from '@/features/payments/components/PaymentRequestForm.vue'
import { usePaymentRequestCreation } from '@/features/payments/composables/usePaymentRequestCreation'

const {
  form,
  isLoadingIPN,
  isSubmitting,
  error,
  businessName,
  hasValidContact,
  canSubmit,
  submitPaymentRequest,
  handleClose,
  updateForm,
} = usePaymentRequestCreation()
</script>
