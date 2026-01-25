// Navigation guard logic
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/auth.store'

export function authGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
): void {
  const authStore = useAuthStore()

  // Protected route - user must be authenticated
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    console.log('Redirecting unauthenticated user to login')
    console.log('TO', to)
    next({ name: 'login', query: { redirect: to.fullPath } })
    return
  }

  // Redirect authenticated users away from login page
  if (to.name === 'login' && authStore.isAuthenticated) {
    console.log('Redirecting authenticated user from login to home')
    console.log('TO', to)
    next({ name: 'home' })
    return
  }

  next()
}
