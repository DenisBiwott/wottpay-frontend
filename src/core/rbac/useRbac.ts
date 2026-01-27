// RBAC composable for permission checks
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Role, Permission, RolePermissions } from './permissions'
import type { RoleType, PermissionType } from './permissions'

export function useRbac() {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  // Current user role
  const role = computed<RoleType | null>(() => {
    if (!user.value?.role) return null
    return user.value.role as RoleType
  })

  // Role checks
  const isAdmin = computed(() => role.value === Role.ADMIN)
  const isMerchant = computed(() => role.value === Role.MERCHANT)
  const isReadOnly = computed(() => role.value === Role.READ_ONLY)

  // Permission check function
  function hasPermission(permission: PermissionType): boolean {
    if (!role.value) return false
    const permissions = RolePermissions[role.value] || []
    return permissions.includes(permission)
  }

  // Computed permission checks for common use cases
  const canCreatePayment = computed(() => hasPermission(Permission.CREATE_PAYMENT))
  const canCancelPayment = computed(() => hasPermission(Permission.CANCEL_PAYMENT))
  const canManageUsers = computed(() => hasPermission(Permission.MANAGE_USERS))
  const canViewUsers = computed(() => hasPermission(Permission.VIEW_USERS))
  const canManageBusiness = computed(() => hasPermission(Permission.MANAGE_BUSINESS))
  const canViewTransactions = computed(() => hasPermission(Permission.VIEW_TRANSACTIONS))
  const canViewPaymentRequests = computed(() => hasPermission(Permission.VIEW_PAYMENT_REQUESTS))
  const canViewInsights = computed(() => hasPermission(Permission.VIEW_INSIGHTS))

  return {
    // Role info
    role,
    isAdmin,
    isMerchant,
    isReadOnly,

    // Permission checks
    hasPermission,
    canCreatePayment,
    canCancelPayment,
    canManageUsers,
    canViewUsers,
    canManageBusiness,
    canViewTransactions,
    canViewPaymentRequests,
    canViewInsights,
  }
}
