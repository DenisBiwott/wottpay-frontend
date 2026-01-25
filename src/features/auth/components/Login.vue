<template>
  <div class="min-h-screen bg-[#f0f0f7] flex flex-col">
    <!-- Header -->
    <header class="flex justify-between items-center px-8 py-4">
      <img src="@/assets/wottpay-logo.jpg" alt="WottPay" class="w-10 h-10 rounded-full" />
      <div class="flex items-center space-x-1.5">
        <a href="#" class="text-primary hover:underline text-sm font-medium">Open Account</a>
        <ChevronRight class="w-4 h-4 text-primary" />
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center px-4">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h1 class="text-2xl font-normal text-gray-800 mb-6">Log In</h1>

        <!-- Error Alert -->
        <Alert variant="error" :show="!!error()" class="mb-4">
          {{ error() }}
        </Alert>

        <form @submit.prevent="handleLogin" class="space-y-5">
          <!-- Email Field -->
          <TextInput
            id="email"
            v-model="email"
            type="email"
            label="Email"
            autocomplete="email"
            required
          />

          <!-- Password Field -->
          <TextInput
            id="password"
            v-model="password"
            type="password"
            label="Password"
            autocomplete="current-password"
            required
            has-toggle
          />

          <!-- Forgot Password Link -->
          <div class="text-right">
            <a href="#" class="text-gray-500 text-sm hover:underline">Forgot password?</a>
          </div>

          <!-- Submit Button -->
          <Button type="submit" :loading="isLoading()" full-width size="md">
            {{ isLoading() ? 'Logging in...' : 'Log In' }}
          </Button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { TextInput, Button, Alert } from '@/components/ui'
import { useLogin } from '@/features/auth/composables/useLogin'
import ChevronRight from '@/components/icons/ChevronRight.vue'

const { email, password, isLoading, error, handleLogin } = useLogin()
</script>
