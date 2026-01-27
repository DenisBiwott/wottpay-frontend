import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useEventLogsStore } from '../store/eventLogs.store'
import { humanReadableDate } from '@/core/utils/formatting'

export function useRecentActivity() {
  const eventLogsStore = useEventLogsStore()
  const { eventLogs, isLoading, error } = storeToRefs(eventLogsStore)

  // Get top 5 most recent event logs (sorted by date desc)
  const recentActivities = computed(() => {
    return [...eventLogs.value]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5)
  })

  const isEmpty = computed(() => !isLoading.value && eventLogs.value.length === 0)

  // Actions
  async function loadRecentActivity() {
    try {
      await eventLogsStore.fetchEventLogs()
    } catch {
      // Error is handled in store
    }
  }

  // Format date for display
  function formatActivityDate(date: string): string {
    return humanReadableDate(date)
  }

  // Extract user email from metadata
  function getUserEmail(metadata: { email?: string; [key: string]: unknown }): string {
    return metadata.email || 'System'
  }

  // Load on mount
  onMounted(() => {
    loadRecentActivity()
  })

  return {
    // State
    recentActivities,
    isLoading,
    error,
    isEmpty,
    // Actions
    loadRecentActivity,
    clearError: eventLogsStore.clearError,
    // Helpers
    formatActivityDate,
    getUserEmail,
  }
}
