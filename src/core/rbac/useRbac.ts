/**
 * RBAC Composable - Permission Checking for Vue Components
 *
 * This composable provides reactive permission checking based on the
 * current user's role. It integrates with the auth store to get the
 * user's role and maps it to permissions defined in permissions.ts.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useRbac } from '@/core/rbac/useRbac'
 *
 * const { canCreatePayment, canManageUsers, hasPermission } = useRbac()
 * </script>
 *
 * <template>
 *   <button v-if="canCreatePayment">New Payment</button>
 *   <AdminPanel v-if="canManageUsers" />
 * </template>
 * ```
 */
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { Role, Permission, RolePermissions } from './permissions'
import type { RoleType, PermissionType } from './permissions'

/**
 * Composable for role-based access control.
 *
 * @returns Object containing:
 * - `role` - Computed ref of the current user's role
 * - `isAdmin`, `isMerchant`, `isReadOnly` - Role check computed refs
 * - `hasPermission(permission)` - Function to check specific permission
 * - `canCreatePayment`, `canCancelPayment`, etc. - Pre-computed permission checks
 */
export function useRbac() {
  const authStore = useAuthStore()
  const { user } = storeToRefs(authStore)

  /**
   * The current user's role, or null if not authenticated.
   */
  const role = computed<RoleType | null>(() => {
    if (!user.value?.role) return null
    return user.value.role as RoleType
  })

  // Role checks - useful for role-specific UI variations
  const isAdmin = computed(() => role.value === Role.ADMIN)
  const isMerchant = computed(() => role.value === Role.MERCHANT)
  const isReadOnly = computed(() => role.value === Role.READ_ONLY)

  /**
   * Checks if the current user has a specific permission.
   *
   * @param permission - The permission to check from Permission constants
   * @returns true if the user's role includes this permission
   *
   * @example
   * if (hasPermission(Permission.MANAGE_BUSINESS)) {
   *   showSettingsTab()
   * }
   */
  function hasPermission(permission: PermissionType): boolean {
    if (!role.value) return false
    const permissions = RolePermissions[role.value] || []
    return permissions.includes(permission)
  }

  // Pre-computed permission checks for common use cases in templates
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
