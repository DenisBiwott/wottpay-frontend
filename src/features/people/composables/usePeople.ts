// People composable
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { usePeopleStore } from '../store/people.store'

export function usePeople() {
  const peopleStore = usePeopleStore()

  const { people, total, isLoading, error } = storeToRefs(peopleStore)

  const isEmpty = computed(() => !isLoading.value && people.value.length === 0)

  async function loadPeople() {
    try {
      await peopleStore.fetchPeople()
    } catch {
      // Error is handled in store
    }
  }

  function getRoleVariant(role: string): 'success' | 'warning' | 'info' | 'default' {
    const variants: Record<string, 'success' | 'warning' | 'info' | 'default'> = {
      ADMIN: 'success',
      MERCHANT: 'warning',
      READ_ONLY: 'info',
    }
    return variants[role] || 'default'
  }

  onMounted(() => {
    loadPeople()
  })

  return {
    // State
    people,
    total,
    isLoading,
    error,
    isEmpty,
    // Actions
    loadPeople,
    // Helpers
    getRoleVariant,
    clearError: peopleStore.clearError,
  }
}
