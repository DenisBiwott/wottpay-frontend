# WottPay Frontend

A modern payment request management platform built with Vue 3 and TypeScript. WottPay enables businesses to create, track, and manage payment requests with features like real-time transaction monitoring, role-based access control, and two-factor authentication.

## Tech Stack

- **Vue 3** - Progressive JavaScript framework with Composition API
- **Vite** - Next-generation frontend build tool
- **TypeScript** - Type-safe JavaScript
- **Pinia** - State management with persistence support
- **Tailwind CSS v4** - Utility-first CSS framework
- **Axios** - HTTP client with interceptor support
- **Vue Router** - Client-side routing with navigation guards

## Architecture

WottPay follows a **feature-based modular architecture** that organizes code by domain rather than technical layer:

```
src/
├── core/                    # Shared infrastructure
│   ├── api/                 # Centralized Axios client with token refresh
│   ├── composables/         # Shared Vue composables (useToast, etc.)
│   ├── constants/           # Application-wide constants
│   ├── guards/              # Navigation guards (auth protection)
│   ├── rbac/                # Role-based access control system
│   ├── stores/              # Shared Pinia stores
│   └── utils/               # Utility functions (formatting, etc.)
│
├── features/                # Feature modules (domain-driven)
│   ├── auth/                # Authentication & TOTP verification
│   │   ├── components/      # Login forms, TOTP input
│   │   ├── composables/     # useLogin, useTotpVerification
│   │   ├── services/        # Auth API calls
│   │   ├── store/           # Auth state (tokens, user)
│   │   └── types/           # Auth-related TypeScript types
│   │
│   ├── home/                # Dashboard & insights
│   ├── payments/            # Payment request creation
│   ├── people/              # User management (RBAC)
│   ├── settings/            # Business settings & IPN webhooks
│   └── transactions/        # Transaction history & filtering
│
├── components/              # Shared UI components
│   ├── common/              # Layouts (Auth, Default, Payment)
│   └── ui/                  # Reusable UI primitives
│
├── composables/             # Global composables
├── views/                   # Route-level page components
├── router/                  # Vue Router configuration
├── App.vue                  # Root component with dynamic layouts
└── main.ts                  # Application entry point
```

## Key Features

### Payment Requests

Create and manage payment requests with customer billing information, amount, currency, and IPN webhook notifications.

### Transaction Management

View and filter transactions with real-time status updates, date range filtering, and export capabilities.

### Role-Based Access Control (RBAC)

Three-tier permission system:

- **ADMIN** - Full access: user management, business settings, all payment operations
- **MERCHANT** - Standard access: create/cancel payments, view transactions and insights
- **READ_ONLY** - Limited access: view-only for transactions, payment requests, and insights

### Two-Factor Authentication (TOTP)

Optional TOTP-based 2FA for enhanced account security. When enabled, users must verify with a time-based code after login.

### Business Settings

Configure IPN (Instant Payment Notification) webhook URLs for real-time payment status callbacks.

## Environment Setup

1. Copy the example environment file:

   ```sh
   cp .env.example .env
   ```

2. Configure the required environment variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000
   ```

## Development Scripts

```sh
# Install dependencies
npm install

# Start development server with hot-reload
npm run dev

# Type-check and build for production
npm run build

# Build without type-checking
npm run build-only

# Run type-checking only
npm run type-check

# Preview production build locally
npm run preview

# Run unit tests with Vitest
npm run test:unit

# Lint and auto-fix with ESLint
npm run lint

# Format code with Prettier
npm run format
```

## Layout System

WottPay uses a **meta-based dynamic layout system**. Each route specifies its layout via `meta.layout`, and App.vue renders the appropriate wrapper:

- **AuthLayout** - Minimal layout for login and TOTP verification
- **DefaultLayout** - Full application layout with sidebar navigation
- **PaymentLayout** - Streamlined layout for payment creation flow

Routes define their layout in the router configuration:

```ts
{
  path: '/transactions',
  component: TransactionsView,
  meta: {
    layout: 'DefaultLayout',
    requiresAuth: true,
  },
}
```

## Authentication Flow

1. **Login** - User submits credentials → receives JWT access token + refresh token
2. **TOTP Check** - If 2FA enabled, user is redirected to verification page
3. **Token Refresh** - Access tokens auto-refresh via Axios interceptor on 401 responses
4. **Session Persistence** - Auth state persisted to localStorage via Pinia plugin

The API client (`/src/core/api/client.ts`) handles:

- Automatic Bearer token attachment to requests
- Token refresh on 401 responses with request queuing
- Redirect to login on refresh failure

## RBAC System

Permissions are checked using the `useRbac()` composable:

```ts
import { useRbac } from '@/core/rbac/useRbac'

const { canCreatePayment, canManageUsers, hasPermission } = useRbac()

// In templates
<button v-if="canCreatePayment">Create Payment</button>

// Programmatic checks
if (hasPermission(Permission.MANAGE_BUSINESS)) {
  // Show business settings
}
```

## IDE Setup

**Recommended:** [VS Code](https://code.visualstudio.com/) + [Vue Official Extension](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

For browser debugging, install [Vue.js DevTools](https://devtools.vuejs.org/).

## License

Private - All rights reserved.
