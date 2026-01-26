<template>
  <div class="min-h-screen bg-[#f0f0f7] flex flex-col">
    <!-- Header -->
    <header class="flex justify-between items-center px-4 sm:px-8 py-4">
      <img src="@/assets/wottpay-logo.jpg" alt="WottPay" class="w-10 h-10 rounded-full" />
      <button
        @click="handleBackToLogin"
        class="text-primary hover:underline text-sm font-medium flex items-center gap-1"
      >
        <ArrowLeft class="w-4 h-4" />
        Back to Login
      </button>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center px-4">
      <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <!-- Icon -->
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <ShieldCheck class="w-8 h-8 text-primary" />
          </div>
        </div>

        <h1 class="text-xl sm:text-2xl font-normal text-gray-800 text-center mb-2">
          Two-Factor Authentication
        </h1>

        <p class="text-gray-500 text-sm text-center mb-6">
          Enter the 6-digit code from your authenticator app
        </p>

        <!-- Error Alert -->
        <Alert variant="error" :show="!!error" class="mb-6">
          {{ error }}
        </Alert>

        <form @submit.prevent="handleVerify" class="space-y-6">
          <!-- Code Input -->
          <CodeInput
            ref="codeInputRef"
            v-model="code"
            :disabled="isLoading"
            :has-error="!!error"
            @complete="handleCodeComplete"
          />

          <!-- Submit Button -->
          <Button
            type="submit"
            :loading="isLoading"
            :disabled="code.length !== 6"
            full-width
            size="md"
          >
            {{ isLoading ? 'Verifying...' : 'Verify' }}
          </Button>
        </form>

        <!-- Resend Link: Useful for not TOTP auth -->
        <div v-if="false" class="mt-6 text-center">
          <p class="text-gray-500 text-sm">
            Didn't receive a code?
            <button
              type="button"
              @click="handleResendCode"
              :disabled="isLoading"
              class="text-primary hover:underline font-medium disabled:opacity-50"
            >
              Try again
            </button>
          </p>
        </div>

        <!-- Help Text -->
        <div class="mt-6 pt-6 border-t border-gray-100">
          <p class="text-gray-400 text-xs text-center">
            Open your authenticator app (like Google Authenticator or Authy) and enter the code
            displayed for WottPay.
          </p>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { Button, Alert, CodeInput } from '@/components/ui'
import { useTotpVerification } from '@/features/auth/composables/useTotpVerification'
import ShieldCheck from '@/components/icons/ShieldCheck.vue'
import ArrowLeft from '@/components/icons/ArrowLeft.vue'

const {
  code,
  codeInputRef,
  isLoading,
  error,

  handleVerify,
  handleCodeComplete,
  handleBackToLogin,
  handleResendCode,
} = useTotpVerification()
</script>
