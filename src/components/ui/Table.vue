<template>
  <div class="">
    <!-- Desktop Table -->
    <div class="hidden md:block overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="">
          <tr>
            <slot name="header"></slot>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <slot name="body"></slot>
        </tbody>
      </table>
    </div>

    <!-- Mobile Cards -->
    <div class="md:hidden space-y-4">
      <slot name="mobile"></slot>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
