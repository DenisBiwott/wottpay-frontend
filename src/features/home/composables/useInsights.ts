// Insights composable
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useInsightsStore } from '../store/insights.store'

export function useInsights() {
  const insightsStore = useInsightsStore()
  const { insights, isLoading, error } = storeToRefs(insightsStore)

  // Computed values for template consumption
  const pendingRequests = computed(() => insights.value?.pendingPaymentRequests ?? 0)
  const paidRequests = computed(() => insights.value?.paidPaymentRequests ?? 0)
  const amountReceived = computed(() => insights.value?.totalAmountReceived ?? 0)

  // Actions
  async function loadInsights() {
    try {
      await insightsStore.fetchInsights()
    } catch {
      // Error is handled in store
    }
  }

  // Load on mount
  onMounted(() => {
    loadInsights()
  })

  return {
    // State
    insights,
    isLoading,
    error,
    // Computed values
    pendingRequests,
    paidRequests,
    amountReceived,
    // Actions
    loadInsights,
    clearError: insightsStore.clearError,
  }
}
