<!-- Default home layout with sidebar, topbar & content: Mobile responsive -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Topbar -->
    <Topbar :is-mobile-menu-open="isMobileMenuOpen" @toggle-menu="toggleMobileMenu" />

    <div class="flex">
      <!-- Mobile overlay backdrop -->
      <Transition
        enter-active-class="transition-opacity ease-linear duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity ease-linear duration-300"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isMobileMenuOpen"
          class="fixed inset-0 bg-gray-600 bg-opacity-50 z-30 md:hidden"
          @click="closeMobileMenu"
        ></div>
      </Transition>

      <!-- Sidebar -->
      <Sidebar :is-open="isMobileMenuOpen" :business-name="businessName" />

      <!-- Main Content Area -->
      <main class="flex-1 min-h-[calc(100vh-4rem)] md:ml-0 overflow-hidden">
        <div class="p-4 sm:p-6 lg:p-8">
          <div class="w-full overflow-x-auto">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Topbar, Sidebar } from '@/components/layout'
import { useLayout, useUserProfile } from '@/composables'

const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useLayout()
const { businessName } = useUserProfile()
</script>
