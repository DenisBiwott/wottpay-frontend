<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-normal text-gray-900 mb-6">Settings</h1>

    <Tabs :tabs="tabs" v-model="activeTab" />

    <div class="mt-6">
      <BusinessSettingsTab v-if="activeTab === 'business'" />
      <UserSettingsTab v-else-if="activeTab === 'user'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Tabs } from '@/components/ui'
import BusinessSettingsTab from './BusinessSettingsTab.vue'
import UserSettingsTab from './UserSettingsTab.vue'
import { useRbac } from '@/core/rbac'

const route = useRoute()
const router = useRouter()

const tabs = computed(() => {
  let settingsTabs = [
    { value: 'business', label: 'Business' },
    { value: 'user', label: 'Profile' },
  ]
  const { canManageBusiness } = useRbac()

  if (!canManageBusiness.value) {
    settingsTabs = settingsTabs.filter((tab) => tab.value !== 'business')
  }

  return settingsTabs
})

const validTabs = tabs.value.map((t) => t.value)
const { canManageBusiness } = useRbac()
const activeTab = ref(canManageBusiness.value ? 'business' : 'user')

// Set initial tab from URL query
onMounted(() => {
  const tabFromQuery = route.query.tab as string
  if (tabFromQuery && validTabs.includes(tabFromQuery)) {
    activeTab.value = tabFromQuery
  }
})

// Watch for URL query changes
watch(
  () => route.query.tab,
  (newTab) => {
    if (newTab && validTabs.includes(newTab as string)) {
      activeTab.value = newTab as string
    }
  },
)

// Update URL when tab changes
watch(activeTab, (newTab) => {
  if (route.query.tab !== newTab) {
    router.replace({ query: { ...route.query, tab: newTab } })
  }
})
</script>
