/**
 * Vue Router Configuration
 *
 * This module defines the application's routing structure. Each route specifies:
 * - `meta.layout`: Determines which layout component wraps the view (see App.vue)
 * - `meta.requiresAuth`: Whether the route requires authentication
 *
 * The authGuard is registered globally and checks requiresAuth on navigation.
 */
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import TotpVerificationView from '@/views/TotpVerificationView.vue'
import PaymentView from '@/views/PaymentView.vue'
import TransasctionsView from '@/views/TransasctionsView.vue'
import PeopleView from '@/views/PeopleView.vue'
import SettingsView from '@/views/SettingsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/core/guards/auth.guard'

/**
 * Route Definitions
 *
 * Layout options:
 * - 'AuthLayout': Minimal layout for authentication pages (login, TOTP)
 * - 'DefaultLayout': Full app layout with sidebar navigation
 * - 'PaymentLayout': Streamlined layout for payment creation flow
 *
 * Authentication:
 * - requiresAuth: true - User must be logged in (redirects to /login if not)
 * - requiresAuth: false - Public route (login redirects away if authenticated)
 */
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
    },
  },
  {
    path: '/verify',
    name: 'totp-verification',
    component: TotpVerificationView,
    meta: {
      layout: 'AuthLayout',
      requiresAuth: false,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: {
      layout: 'AuthLayout',
      requiresAuth: false,
    },
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentView,
    meta: {
      layout: 'PaymentLayout',
      requiresAuth: true,
    },
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: TransasctionsView,
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
    },
  },
  {
    path: '/people',
    name: 'people',
    component: PeopleView,
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
    },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView,
    meta: {
      layout: 'DefaultLayout',
      requiresAuth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Register global navigation guard for authentication
router.beforeEach(authGuard)

export default router
