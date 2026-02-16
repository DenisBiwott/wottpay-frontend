import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useToast } from '@/core/composables/useToast'
import { fetchIPNListApi, createPaymentRequestApi } from '../services/payments.service'
import type { IPN, PaymentRequestFormState } from '../types/payments.types'
import axios from 'axios'

export function usePaymentRequestCreation() {
  const router = useRouter()
  const authStore = useAuthStore()
  const toast = useToast()

  // State
  const form = ref<PaymentRequestFormState>({
    amount: '',
    currency: 'KES',
    description: '',
    emailAddress: '',
    phoneNumber: '',
    firstName: '',
    lastName: '',
    countryCode: 'KE',
  })

  const ipnList = ref<IPN[]>([])
  const isLoadingIPN = ref(false)
  const isSubmitting = ref(false)
  const error = ref<string | null>(null)

  // Computed
  const businessId = computed(() => authStore.user?.businessId ?? '')
  const businessName = computed(() => authStore.user?.business?.name ?? '')

  const hasValidContact = computed(() => {
    return !!(form.value.emailAddress.trim() || form.value.phoneNumber.trim())
  })

  const canSubmit = computed(() => {
    const hasAmount = parseFloat(form.value.amount) > 0
    const hasDescription = form.value.description.trim().length > 0
    return hasAmount && hasDescription && hasValidContact.value && !isSubmitting.value
  })

  // Actions
  async function loadIPNList() {
    if (!businessId.value) return

    isLoadingIPN.value = true
    error.value = null

    try {
      ipnList.value = await fetchIPNListApi(businessId.value)
      if (ipnList.value.length === 0) {
        error.value =
          'No IPN configured. Please configure an IPN URL in settings before creating payment requests.'
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        if (Array.isArray(errorMessage)) {
          error.value = errorMessage.join(' ')
        } else {
          error.value = errorMessage
        }
      } else {
        error.value = 'Failed to load IPN configuration. Please try again.'
      }
    } finally {
      isLoadingIPN.value = false
    }
  }

  async function submitPaymentRequest() {
    const ipn = ipnList.value[0]
    if (!canSubmit.value || !ipn) return

    isSubmitting.value = true
    error.value = null

    try {
      const payload = {
        amount: parseFloat(form.value.amount),
        currency: form.value.currency,
        description: form.value.description,
        billingAddress: {
          emailAddress: form.value.emailAddress || undefined,
          phoneNumber: form.value.phoneNumber || undefined,
          countryCode: form.value.countryCode,
          firstName: form.value.firstName || undefined,
          lastName: form.value.lastName || undefined,
        },
        businessId: businessId.value,
        callbackUrl: import.meta.env?.VITE_API_BASE_URL || 'https://pay.denisbiwott.com/api/',
        notificationId: ipn.ipnId,
      }

      await createPaymentRequestApi(payload)
      toast.success('Payment request created successfully')
      router.back()
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        const errorMessage = err.response.data.message
        if (Array.isArray(errorMessage)) {
          error.value = errorMessage.join(' ')
        } else {
          error.value = errorMessage
        }
      } else {
        error.value = 'Failed to create payment request. Please try again.'
      }
    } finally {
      isSubmitting.value = false
    }
  }

  function handleClose() {
    router.back()
  }

  function clearError() {
    error.value = null
  }

  function updateForm(newForm: PaymentRequestFormState) {
    form.value = newForm
  }

  onMounted(() => {
    loadIPNList()
  })

  return {
    // State
    form,
    isLoadingIPN,
    isSubmitting,
    error,
    businessName,
    // Computed
    hasValidContact,
    canSubmit,
    // Actions
    submitPaymentRequest,
    handleClose,
    clearError,
    updateForm,
  }
}
