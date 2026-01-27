<template>
  <div class="py-6 space-y-8">
    <!-- Business Name Section -->
    <section>
      <h3 class="text-lg text-gray-900 mb-4">Business Information</h3>
      <div class="bg-white border border-slate-200 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm text-gray-500">Business Name</p>
            <p class="text-sm text-gray-900 mt-2">{{ businessName }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- IPN Webhooks Section -->
    <section>
      <div class="flex items-center gap-2 mb-4">
        <h3 class="text-lg text-gray-900">IPN Webhooks</h3>
        <div class="relative group">
          <InfoOutlineIcon class="w-4 h-4 text-gray-400 cursor-help" />
          <div
            class="absolute left-0 bottom-full mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10"
          >
            Instant Payment Notification (IPN) webhooks allow you to receive real-time payment
            status updates at your specified URL.
          </div>
        </div>
      </div>

      <!-- Register New IPN Form -->
      <div class="bg-white border border-slate-200 rounded-lg p-4 mb-6">
        <h4 class="text-sm text-gray-900 mb-3">Register New Webhook</h4>
        <div class="flex flex-col sm:flex-row gap-3">
          <div class="flex-1 mb-4">
            <TextInput
              size="sm"
              class="h-8"
              id="ipn-url"
              v-model="newIpnUrl"
              type="text"
              label="Webhook URL"
              @keyup.enter="registerNewIPN"
            />
            <p v-if="urlError" class="mt-1 text-sm text-red-500">{{ urlError }}</p>
          </div>
          <div class="flex items-center">
            <Button
              size="sm"
              @click="registerNewIPN"
              :loading="isRegistering"
              :disabled="isRegistering"
              class="w-full sm:w-auto"
            >
              Register
            </Button>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <Alert v-if="error" variant="error" class="mb-4">
        {{ error }}
        <button @click="clearError" class="ml-2 underline">Dismiss</button>
      </Alert>

      <!-- Loading State -->
      <Loader v-if="isLoading" container-class="py-8" />

      <!-- Empty State -->
      <div v-else-if="isEmpty" class="text-center py-8">
        <p class="text-sm text-gray-500">No IPN webhooks registered yet.</p>
      </div>

      <!-- IPNs Table -->
      <Table v-else>
        <template #header>
          <TableCell is-header>URL</TableCell>
          <TableCell is-header>Notification Type</TableCell>
          <TableCell is-header>Created</TableCell>
        </template>

        <template #body>
          <TableRow v-for="ipn in ipns" :key="ipn.id">
            <TableCell>
              <div class="flex items-center gap-2">
                <span class="text-sm max-w-xs truncate">{{ ipn.url }}</span>
                <Badge v-if="ipn.id === mostRecentIpnId" variant="success">New</Badge>
              </div>
            </TableCell>
            <TableCell>
              <span class="text-sm">{{ ipn.notificationType }}</span>
            </TableCell>
            <TableCell>
              <span class="text-sm">{{ formatIpnDate(ipn.createdAt) }}</span>
            </TableCell>
          </TableRow>
        </template>

        <template #mobile>
          <div
            v-for="ipn in ipns"
            :key="ipn.id"
            class="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500">URL</span>
                <Badge v-if="ipn.id === mostRecentIpnId" variant="success">New</Badge>
              </div>
              <p class="text-sm text-gray-900 truncate">{{ ipn.url }}</p>
              <div class="flex justify-between pt-2 border-t border-gray-100">
                <span class="text-sm text-gray-500">Type</span>
                <span class="text-sm text-gray-900">{{ ipn.notificationType }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-sm text-gray-500">Created</span>
                <span class="text-sm text-gray-900">{{ formatIpnDate(ipn.createdAt) }}</span>
              </div>
            </div>
          </div>
        </template>
      </Table>
    </section>
  </div>
</template>

<script setup lang="ts">
import {
  Alert,
  Button,
  Loader,
  TextInput,
  Table,
  TableRow,
  TableCell,
  Badge,
} from '@/components/ui'
import { InfoOutlineIcon } from '@/components/icons'
import { useBusinessSettings } from '../composables/useBusinessSettings'

const {
  ipns,
  isLoading,
  isRegistering,
  error,
  isEmpty,
  businessName,
  newIpnUrl,
  urlError,
  mostRecentIpnId,
  registerNewIPN,
  clearError,
  formatIpnDate,
} = useBusinessSettings()
</script>
