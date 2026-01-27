<template>
  <div class="">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-normal text-gray-900 mb-6">People</h1>
      <span v-if="total > 0" class="text-sm text-gray-500">{{ total }} users</span>
    </div>

    <Tabs class="mb-6" :tabs="tabs" v-model="activeTab" />

    <!-- Error State -->
    <Alert v-if="error" variant="error" class="mb-4">
      {{ error }}
      <button @click="clearError" class="ml-2 underline">Dismiss</button>
    </Alert>

    <!-- Loading State -->
    <Loader v-if="isLoading" />

    <!-- Empty State -->
    <div v-else-if="isEmpty" class="text-center py-12">
      <div class="mx-auto h-12 w-12 text-gray-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No users found</h3>
      <p class="mt-1 text-sm text-gray-500">Users in your organization will appear here.</p>
    </div>

    <!-- Table -->
    <PeopleTable v-else :people="people" :get-role-variant="getRoleVariant" />
  </div>
</template>

<script setup lang="ts">
import { Alert, Loader } from '@/components/ui'
import PeopleTable from './PeopleTable.vue'
import { usePeople } from '../composables/usePeople'
import { Tabs } from '@/components/ui'
import { ref } from 'vue'

const { people, total, isLoading, error, isEmpty, getRoleVariant, clearError } = usePeople()
const tabs = [{ value: 'all', label: 'All Users' }]
const activeTab = ref('all')
</script>
