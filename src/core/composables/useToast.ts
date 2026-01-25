import { useToastStore } from '@/core/stores/toast.store'

export function useToast() {
  const toastStore = useToastStore()

  return {
    success: toastStore.success,
    error: toastStore.error,
    warning: toastStore.warning,
    info: toastStore.info,
    show: toastStore.show,
  }
}
