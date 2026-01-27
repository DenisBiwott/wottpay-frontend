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
import { ref } from 'vue'
import { Tabs } from '@/components/ui'
import BusinessSettingsTab from './BusinessSettingsTab.vue'
import UserSettingsTab from './UserSettingsTab.vue'

const tabs = [
  { value: 'business', label: 'Business' },
  { value: 'user', label: 'Profile' },
]

const activeTab = ref('business')
</script>
