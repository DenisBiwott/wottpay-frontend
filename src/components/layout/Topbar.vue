<template>
  <header class="sticky top-0 z-30 bg-white border-b border-gray-200">
    <div class="flex items-center justify-between h-16 px-4 sm:pr-6">
      <!-- Left side: Mobile menu button + Logo -->
      <div class="flex items-center gap-4">
        <MobileMenuButton :is-open="isMobileMenuOpen" @toggle="$emit('toggle-menu')" />
        <!-- Business Switcher -->
        <BusinessSwitcher :business-name="businessName" />
      </div>

      <!-- Right side: Profile dropdown -->
      <Dropdown align="right" width="w-56">
        <template #trigger>
          <button
            type="button"
            class="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 focus:outline-none cursor-pointer"
          >
            <Avatar :initials="userInitials" size="sm" />
            <ChevronDown class="w-4 h-4 text-gray-500 hidden sm:block" />
          </button>
        </template>

        <!-- Profile header -->
        <div class="px-4 py-3 border-b border-gray-100">
          <p class="text-sm font-medium text-gray-900 truncate">{{ userEmail }}</p>
          <p class="text-xs text-gray-500 truncate">{{ businessName }}</p>
        </div>

        <!-- Menu items -->
        <DropdownItem @click="navigateToProfile">
          <template #icon>
            <UserIcon class="w-5 h-5" />
          </template>
          Profile
        </DropdownItem>

        <DropdownItem @click="navigateToSettings">
          <template #icon>
            <SettingsIcon class="w-5 h-5" />
          </template>
          Settings
        </DropdownItem>

        <div class="border-t border-gray-100 my-1"></div>

        <DropdownItem @click="handleLogout">
          <template #icon>
            <LogoutIcon class="w-5 h-5" />
          </template>
          Logout
        </DropdownItem>
      </Dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Avatar, Dropdown, DropdownItem } from '@/components/ui'
import { ChevronDown, UserIcon, SettingsIcon, LogoutIcon } from '@/components/icons'
import MobileMenuButton from './MobileMenuButton.vue'
import { useUserProfile } from '@/composables'
import BusinessSwitcher from './BusinessSwitcher.vue'

defineProps<{
  isMobileMenuOpen: boolean
}>()

defineEmits<{
  'toggle-menu': []
}>()

const { userInitials, userEmail, businessName, handleLogout } = useUserProfile()

function navigateToProfile() {
  // TODO: Implement profile navigation
}

function navigateToSettings() {
  // TODO: Implement settings navigation
}
</script>
