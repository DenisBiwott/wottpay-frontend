<template>
  <!-- Desktop Table -->
  <Table class="hidden md:block">
    <template #header>
      <TableCell is-header>Email</TableCell>
      <TableCell is-header>Role</TableCell>
      <TableCell is-header>2FA Enabled</TableCell>
    </template>

    <template #body>
      <TableRow v-for="person in people" :key="person.id">
        <TableCell>{{ person.email }}</TableCell>
        <TableCell>
          <Badge :variant="getRoleVariant(person.role)">
            {{ person.role }}
          </Badge>
        </TableCell>
        <TableCell>
          <span v-if="person.isTotpEnabled" class="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
          </span>
          <span v-else class="text-gray-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </span>
        </TableCell>
      </TableRow>
    </template>
  </Table>

  <!-- Mobile Cards -->
  <div class="md:hidden space-y-3">
    <div
      v-for="person in people"
      :key="person.id"
      class="bg-white rounded-lg border border-gray-200 p-4 space-y-3"
    >
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-900">{{ person.email }}</p>
        </div>
        <Badge :variant="getRoleVariant(person.role)">
          {{ person.role }}
        </Badge>
      </div>

      <div class="flex items-center gap-2 text-sm text-gray-500">
        <span>2FA:</span>
        <span v-if="person.isTotpEnabled" class="text-green-600 font-medium">Enabled</span>
        <span v-else class="text-gray-400">Disabled</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Table, TableRow, TableCell, Badge } from '@/components/ui'
import type { Person } from '../types/people.types'

defineProps<{
  people: Person[]
  getRoleVariant: (role: string) => 'success' | 'warning' | 'info' | 'default'
}>()
</script>
