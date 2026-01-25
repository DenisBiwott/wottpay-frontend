import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import PaymentView from '@/views/PaymentView.vue'
import TransasctionsView from '@/views/TransasctionsView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { authGuard } from '@/core/guards/auth.guard'

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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Register auth guard
router.beforeEach(authGuard)

export default router
