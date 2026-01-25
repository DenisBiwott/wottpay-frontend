<template>
  <div>
    <h1 class="text-2xl font-normal text-gray-900 mb-6">Transactions & Requests</h1>

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

const tabs: Tab[] = [
  { label: 'Payment Requests', value: 'payment-requests' },
  { label: 'Transactions', value: 'transactions' },
]

const activeTab = ref('payment-requests')
</script>

<style scoped></style>
