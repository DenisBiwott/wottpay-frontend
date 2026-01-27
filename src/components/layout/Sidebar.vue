<template>
  <aside
    :class="[
      'fixed inset-y-0 left-0 z-40 w-64 min-w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out',
      'md:translate-x-0 md:static md:inset-auto',
      isOpen ? 'translate-x-0' : '-translate-x-full',
    ]"
  >
    <div class="flex flex-col h-full">
      <!-- Navigation -->
      <nav class="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <SidebarNavItem :to="{ name: 'home' }" label="Home">
          <template #icon>
            <HomeIcon />
          </template>
        </SidebarNavItem>

        <SidebarNavItem :to="{ name: 'transactions' }" label="Payments">
          <template #icon>
            <PaymentsIcon />
          </template>
        </SidebarNavItem>

        <SidebarNavItem v-if="canViewUsers" :to="{ name: 'people' }" label="People">
          <template #icon>
            <UsersIcon />
          </template>
        </SidebarNavItem>

        <SidebarNavItem :to="{ name: 'settings' }" label="Settings">
          <template #icon>
            <SettingsIcon />
          </template>
        </SidebarNavItem>
      </nav>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { HomeIcon, PaymentsIcon, UsersIcon, SettingsIcon } from '@/components/icons'
import SidebarNavItem from './SidebarNavItem.vue'
import { useRbac } from '@/core/rbac'

defineProps<{
  isOpen: boolean
  businessName: string
}>()

const { canViewUsers } = useRbac()
</script>
