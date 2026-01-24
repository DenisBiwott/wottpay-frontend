<!-- App entry-point -->
<template>
  <router-view v-slot="{ Component, route }">
    <!-- Set layout dynamically based on route -->
    <component :is="layouts[route.meta.layout as keyof typeof layouts] || layouts.DefaultLayout">
      <component :is="Component" />
    </component>
  </router-view>
</template>

<script setup lang="ts">
import AuthLayout from './components/common/AuthLayout.vue'
import DefaultLayout from './components/common/DefaultLayout.vue'
import PaymentLayout from './components/common/PaymentLayout.vue'

const layouts = {
  AuthLayout,
  DefaultLayout,
  PaymentLayout,
}
</script>
