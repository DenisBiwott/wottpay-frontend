<template>
  <div class="py-6 space-y-8">
    <!-- Profile Section -->
    <section>
      <h3 class="text-lg text-gray-900 mb-4">Profile Information</h3>
      <div class="bg-white border border-slate-200 rounded-lg p-4 space-y-4">
        <div class="flex items-center justify-between py-2 border-b border-gray-200">
          <span class="text-sm text-gray-500">Email</span>
          <span class="text-sm text-gray-900">{{ userEmail }}</span>
        </div>
        <div class="flex items-center justify-between py-2 border-b border-gray-200">
          <span class="text-sm text-gray-500">Role</span>
          <span class="text-sm text-gray-900">{{ splitVariables(userRole, '_') }}</span>
        </div>
        <div class="flex items-center justify-between py-2">
          <span class="text-sm text-gray-500">Business</span>
          <span class="text-sm text-gray-900">{{ businessName }}</span>
        </div>
      </div>
    </section>

    <!-- Two-Factor Authentication Section -->
    <section>
      <h3 class="text-lg text-gray-900 mb-4">Two-Factor Authentication</h3>

      <!-- Error State -->
      <Alert v-if="error" variant="error" class="mb-4">
        {{ error }}
        <button @click="clearError" class="ml-2 underline">Dismiss</button>
      </Alert>

      <!-- Idle State - Show current status and action button -->
      <div v-if="currentStep === 'idle'" class="bg-gray-50 rounded-lg p-4">
        <div class="flex items-center justify-between">
          <div class="flex items-start gap-3">
            <ShieldCheck
              class="w-5 h-5"
              :class="isTotpEnabled ? 'text-green-500' : 'text-gray-400'"
            />
            <div>
              <p class="text-sm text-gray-900">
                {{ isTotpEnabled ? 'Enabled' : 'Disabled' }}
              </p>
              <p class="text-xs text-gray-500">
                {{
                  isTotpEnabled
                    ? 'Your account is protected with 2FA'
                    : 'Add an extra layer of security to your account'
                }}
              </p>
            </div>
          </div>

          <Button v-if="isTotpEnabled" variant="secondary" @click="startDisableFlow" size="sm">
            Disable
          </Button>
          <Button v-else @click="startEnableFlow" size="sm">Enable</Button>
        </div>
      </div>

      <!-- Setup Step - Initial enable flow -->
      <div
        v-else-if="currentStep === 'setup'"
        class="bg-white border border-slate-200 rounded-lg p-6"
      >
        <h4 class="text-base text-gray-900 mb-2">Enable Two-Factor Authentication</h4>
        <p class="text-sm text-gray-500 mb-6">
          You'll need an authenticator app like Google Authenticator or Authy to complete this
          setup.
        </p>
        <div class="flex gap-3">
          <Button size="sm" @click="initiateTotpSetup" :loading="isLoading" :disabled="isLoading">
            Continue Setup
          </Button>
          <Button size="sm" variant="secondary" @click="cancelFlow" :disabled="isLoading">
            Cancel
          </Button>
        </div>
      </div>

      <!-- Verify Step - Show QR code and verification input -->
      <div
        v-else-if="currentStep === 'verify'"
        class="bg-white border border-slate-200 rounded-lg p-6"
      >
        <h4 class="text-base text-gray-900 mb-2">Scan QR Code</h4>
        <p class="text-sm text-gray-500 mb-6">
          Scan this QR code with your authenticator app, then enter the verification code below.
        </p>

        <div class="flex flex-col items-center mb-6">
          <!-- QR Code -->
          <div v-if="qrCodeUrl" class="mb-4 p-4 bg-white rounded-lg border border-gray-200">
            <img :src="qrCodeUrl" alt="TOTP QR Code" class="w-48 h-48" />
          </div>

          <!-- Manual Secret -->
          <div v-if="secret" class="text-center">
            <p class="text-xs text-gray-500 mb-1">Or enter this code manually:</p>
            <code class="px-3 py-1 bg-gray-100 rounded text-sm font-mono select-all">{{
              secret
            }}</code>
          </div>
        </div>

        <!-- Verification Code Input -->
        <div class="mb-6">
          <CodeInput v-model="verificationCode" @complete="onCodeComplete" :disabled="isLoading" />
        </div>

        <div class="flex gap-3">
          <Button size="sm" variant="secondary" @click="cancelFlow" :disabled="isLoading">
            Cancel
          </Button>
        </div>
      </div>

      <!-- Disable Step - Confirm with code -->
      <div v-else-if="currentStep === 'disable'" class="bg-gray-50 rounded-lg p-6">
        <h4 class="text-base font-medium text-gray-900 mb-2">Disable Two-Factor Authentication</h4>
        <p class="text-sm text-gray-500 mb-6">
          Enter a code from your authenticator app to confirm disabling 2FA.
        </p>

        <!-- Verification Code Input -->
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Verification Code</label>
          <CodeInput v-model="disableCode" @complete="onCodeComplete" :disabled="isLoading" />
        </div>

        <div class="flex gap-3">
          <Button size="sm" variant="secondary" @click="cancelFlow" :disabled="isLoading">
            Cancel
          </Button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Alert, Button, CodeInput } from '@/components/ui'
import { ShieldCheck } from '@/components/icons'
import { useAuthStore } from '@/features/auth/store/auth.store'
import { useTotpSettings } from '../composables/useTotpSettings'
import { splitVariables } from '@/core/utils/formatting'

const authStore = useAuthStore()

// Profile information
const userEmail = computed(() => authStore.user?.email || 'Unknown')
const userRole = computed(() => authStore.user?.role || 'Unknown')
const businessName = computed(() => authStore.user?.business?.name || 'Unknown')

// TOTP settings
const {
  currentStep,
  isLoading,
  error,
  secret,
  qrCodeUrl,
  verificationCode,
  isTotpEnabled,
  startEnableFlow,
  startDisableFlow,
  cancelFlow,
  initiateTotpSetup,
  clearError,
  onCodeComplete,
} = useTotpSettings()

// Separate ref for disable flow
const disableCode = verificationCode
</script>
