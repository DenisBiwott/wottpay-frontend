<template>
  <header class="sticky top-0 bg-white border-b border-slate-200 z-60">
    <div class="flex items-center justify-between h-16 px-4 sm:pr-6">
      <!-- Left side: Mobile menu button + Logo -->
      <div class="flex items-center gap-4">
        <MobileMenuButton :is-open="isMobileMenuOpen" @toggle="$emit('toggle-menu')" />
        <!-- Business Switcher -->
        <BusinessSwitcher :business-name="businessName" />
      </div>

      <!-- Right side: Profile dropdown -->
      <Dropdown ref="dropdownRef" align="right" width="w-56">
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
          <p class="text-xs text-gray-500 truncate">{{ splitVariables(userRole, '_') }}</p>
        </div>

        <!-- Menu items -->
        <DropdownItem @click="navigateToProfile">
          <template #icon>
            <UserIcon class="w-5 h-5" />
          </template>
          Profile
        </DropdownItem>

        <DropdownItem v-if="canManageBusiness" @click="navigateToSettings">
          <template #icon>
            <SettingsIcon class="w-5 h-5" />
          </template>
          Settings
        </DropdownItem>

        <div class="border-t border-gray-100 my-1"></div>

        <DropdownItem @click="logout">
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Avatar, Dropdown, DropdownItem } from '@/components/ui'
import { ChevronDown, UserIcon, SettingsIcon, LogoutIcon } from '@/components/icons'
import MobileMenuButton from './MobileMenuButton.vue'
import { useUserProfile } from '@/composables'
import BusinessSwitcher from './BusinessSwitcher.vue'
import { useRbac } from '@/core/rbac'
import { splitVariables } from '@/core/utils/formatting'

const router = useRouter()
const dropdownRef = ref<InstanceType<typeof Dropdown> | null>(null)

defineProps<{
  isMobileMenuOpen: boolean
}>()

defineEmits<{
  'toggle-menu': []
}>()

const { userInitials, userEmail, userRole, businessName, handleLogout } = useUserProfile()

function logout() {
  dropdownRef.value?.close()
  handleLogout()
}

function navigateToProfile() {
  dropdownRef.value?.close()
  router.push({ path: '/settings', query: { tab: 'user' } })
}

function navigateToSettings() {
  dropdownRef.value?.close()
  router.push({ path: '/settings', query: { tab: 'business' } })
}

const { canManageBusiness } = useRbac()
</script>
