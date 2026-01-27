<template>
  <div>
    <div class="flex justify-between">
      <h1 class="text-2xl font-normal text-gray-900 mb-6">Transactions & Requests</h1>

      <Button
        size="sm"
        class="text-sm h-10 cursor-pointer"
        variant="primary"
        @click="handleRequest"
      >
        <span>Request Payment</span>
        <PlusIcon class="h-4 w-4 ml-2" />
      </Button>
    </div>

    <Tabs v-model="activeTab" :tabs="tabs" />

    <PaymentRequestsTab v-if="activeTab === 'payment-requests'" />
    <TransactionsTab v-else-if="activeTab === 'transactions'" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Tabs } from '@/components/ui'
import type { Tab } from '@/components/ui/Tabs.vue'
import PaymentRequestsTab from './PaymentRequestsTab.vue'
import TransactionsTab from './TransactionsTab.vue'
import Button from '@/components/ui/Button.vue'
import router from '@/router'
import PlusIcon from '@/components/icons/PlusIcon.vue'

const tabs: Tab[] = [
  { label: 'Payment Requests', value: 'payment-requests' },
  { label: 'Transactions', value: 'transactions' },
]

const activeTab = ref('payment-requests')

function handleRequest() {
  router.push({ name: 'payment' })
}
</script>

<style scoped></style>
