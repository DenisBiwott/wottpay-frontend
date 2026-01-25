<template>
  <div class="space-y-8">
    <!-- Greeting -->
    <div>
      <h1 class="text-2xl font-normal text-gray-900">{{ greeting }}</h1>
    </div>

    <!-- Quick Actions -->
    <section>
      <div class="flex flex-nowrap overflow-x-auto space-x-4 h-8 hidden-scrollbar">
        <QuickActionButton label="Request" variant="primary" @click="handleRequest">
          <template #icon>
            <RequestIcon class="h-4 w-4" />
          </template>
        </QuickActionButton>

        <QuickActionButton label="Pay" variant="outline" @click="handlePay">
          <template #icon>
            <PayIcon class="h-4 w-4" />
          </template>
        </QuickActionButton>

        <QuickActionButton label="Transfer" variant="outline" @click="handleTransfer">
          <template #icon>
            <TransferIcon class="h-4 w-4" />
          </template>
        </QuickActionButton>
      </div>
    </section>

    <!-- Overview Cards -->
    <section>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <OverviewCard
          title="Pending Requests"
          :value="pendingRequests"
          subtitle="Awaiting payment"
        />

        <OverviewCard title="Paid Requests" :value="paidRequests" subtitle="This month" />

        <OverviewCard
          title="Amount Received"
          :value="amountReceived"
          :is-currency="true"
          subtitle="This month"
        />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { RequestIcon, PayIcon, TransferIcon } from '@/components/icons'
import { getGreeting } from '@/core/utils/greeting'
import { useUserProfile } from '@/composables'
import QuickActionButton from './QuickActionButton.vue'
import OverviewCard from './OverviewCard.vue'

const { firstName } = useUserProfile()

const greeting = computed(() => getGreeting(firstName.value))

// TODO: Replace with actual data from store/API
const pendingRequests = ref(12)
const paidRequests = ref(48)
const amountReceived = ref(125000)

function handleRequest() {
  // TODO: Implement request action
}

function handlePay() {
  // TODO: Implement pay action
}

function handleTransfer() {
  // TODO: Implement transfer action
}
</script>
