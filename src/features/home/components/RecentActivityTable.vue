<template>
  <section>
    <h2 v-if="!isLoading" class="text-lg text-gray-900 mb-4">Recent Activity</h2>

    <!-- Empty State -->
    <div v-if="isEmpty && !isLoading" class="text-center py-8">
      <p class="text-sm text-gray-500">No recent activity to display.</p>
    </div>

    <div v-if="!isLoading" class="px-4 py-2 rounded-xl bg-white border border-slate-200">
      <!-- Activity Table -->
      <Table>
        <template #header>
          <TableCell is-header>Date/Time</TableCell>
          <TableCell is-header>User</TableCell>
          <TableCell is-header>Action</TableCell>
        </template>
        <template #body>
          <TableRow v-for="activity in recentActivities" :key="activity.id">
            <TableCell>
              <span class="text-sm">{{ formatActivityDate(activity.createdAt) }}</span>
            </TableCell>
            <TableCell>
              <span class="text-sm">{{ getUserEmail(activity.metadata) }}</span>
            </TableCell>
            <TableCell>
              <span class="text-xs">{{ splitVariables(activity.action, '_') }}</span>
            </TableCell>
          </TableRow>
        </template>
        <template #mobile>
          <div
            v-for="activity in recentActivities"
            :key="activity.id"
            class="bg-white border border-gray-200 rounded-lg p-4 mt-2 shadow-sm"
          >
            <div class="space-y-2">
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Date/Time</span>
                <span class="text-sm text-gray-900">{{
                  formatActivityDate(activity.createdAt)
                }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">User</span>
                <span class="text-sm text-gray-900">{{ getUserEmail(activity.metadata) }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Action</span>
                <span class="text-xs text-gray-900">{{
                  splitVariables(activity.action, '_')
                }}</span>
              </div>
            </div>
          </div>
        </template>
      </Table>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Alert, Loader, Table, TableRow, TableCell } from '@/components/ui'
import { useRecentActivity } from '../composables/useRecentActivity'
import { splitVariables } from '@/core/utils/formatting'

const {
  recentActivities,
  isLoading,
  error,
  isEmpty,
  clearError,
  formatActivityDate,
  getUserEmail,
} = useRecentActivity()
</script>
