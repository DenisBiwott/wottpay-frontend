// Role and permission definitions

export const Role = {
  ADMIN: 'ADMIN',
  MERCHANT: 'MERCHANT',
  READ_ONLY: 'READ_ONLY',
} as const

export type RoleType = (typeof Role)[keyof typeof Role]

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

// Role to permissions mapping
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
