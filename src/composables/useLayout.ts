import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)

export function useLayout() {
  const route = useRoute()

  function toggleMobileMenu() {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
  }

  function openMobileMenu() {
    isMobileMenuOpen.value = true
  }

  function closeMobileMenu() {
    isMobileMenuOpen.value = false
  }

  // Auto-close mobile menu on route change
  watch(
    () => route.path,
    () => {
      closeMobileMenu()
    },
  )

  return {
    isMobileMenuOpen,
    toggleMobileMenu,
    openMobileMenu,
    closeMobileMenu,
  }
}
