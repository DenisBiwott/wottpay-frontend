/**
 * Role-Based Access Control (RBAC) - Role and Permission Definitions
 *
 * This module defines the RBAC system for WottPay. It uses a role-to-permissions
 * mapping pattern where each role is assigned a set of permissions.
 *
 * Design:
 * - Roles are hierarchical in terms of capability (ADMIN > MERCHANT > READ_ONLY)
 * - Permissions are granular and can be composed for different roles
 * - The RolePermissions mapping determines what each role can do
 *
 * Usage:
 * Import these constants and types to check permissions via the useRbac() composable.
 */

/**
 * Available user roles in the system.
 *
 * - ADMIN: Full system access including user and business management
 * - MERCHANT: Standard business user with payment creation capabilities
 * - READ_ONLY: Observer role with view-only access to data
 */
export const Role = {
  ADMIN: 'ADMIN',
  MERCHANT: 'MERCHANT',
  READ_ONLY: 'READ_ONLY',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]

/**
 * Granular permissions for feature access control.
 *
 * User Management:
 * - MANAGE_USERS: Create, update, and delete users within the business
 * - VIEW_USERS: View user list and details
 *
 * Business Management:
 * - MANAGE_BUSINESS: Configure business settings, IPN webhooks, etc.
 *
 * Payment Operations:
 * - CREATE_PAYMENT: Create new payment requests
 * - CANCEL_PAYMENT: Cancel pending payment requests
 *
 * View Permissions:
 * - VIEW_TRANSACTIONS: Access transaction history
 * - VIEW_PAYMENT_REQUESTS: Access payment request list
 * - VIEW_INSIGHTS: Access dashboard analytics and insights
 */
export const Permission = {
  // User management
  MANAGE_USERS: 'MANAGE_USERS',
  VIEW_USERS: 'VIEW_USERS',

  // Business management
  MANAGE_BUSINESS: 'MANAGE_BUSINESS',

  // Payment actions
  CREATE_PAYMENT: 'CREATE_PAYMENT',
  CANCEL_PAYMENT: 'CANCEL_PAYMENT',

  // View permissions
  VIEW_TRANSACTIONS: 'VIEW_TRANSACTIONS',
  VIEW_PAYMENT_REQUESTS: 'VIEW_PAYMENT_REQUESTS',
  VIEW_INSIGHTS: 'VIEW_INSIGHTS',
} as const

export type PermissionType = (typeof Permission)[keyof typeof Permission]

/**
 * Role-to-Permissions Mapping
 *
 * Defines which permissions each role has. This is the source of truth
 * for authorization decisions throughout the application.
 *
 * Permission hierarchy:
 * - ADMIN: All permissions (full access)
 * - MERCHANT: Payment operations + all view permissions
 * - READ_ONLY: View permissions only (no write operations)
 */
export const RolePermissions: Record<RoleType, PermissionType[]> = {
  [Role.ADMIN]: [
    Permission.MANAGE_USERS,
    Permission.VIEW_USERS,
    Permission.MANAGE_BUSINESS,
    Permission.CREATE_PAYMENT,
    Permission.CANCEL_PAYMENT,
    Permission.VIEW_TRANSACTIONS,
    Permission.VIEW_PAYMENT_REQUESTS,
    Permission.VIEW_INSIGHTS,
  ],
  [Role.MERCHANT]: [
    Permission.CREATE_PAYMENT,
    Permission.CANCEL_PAYMENT,
    Permission.VIEW_TRANSACTIONS,
    Permission.VIEW_PAYMENT_REQUESTS,
    Permission.VIEW_INSIGHTS,
  ],
  [Role.READ_ONLY]: [
    Permission.VIEW_TRANSACTIONS,
    Permission.VIEW_PAYMENT_REQUESTS,
    Permission.VIEW_INSIGHTS,
  ],
}
