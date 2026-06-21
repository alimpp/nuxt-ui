<template>
  <UApp>
    <div class="min-h-screen flex items-center justify-center bg-default px-4">
      <UCard
        class="w-full max-w-md shadow-lg"
        :ui="{
          body: 'p-6 sm:p-8',
        }"
      >
        <div class="mb-8 flex flex-col items-center justify-center text-center">
          <img
            src="/image/logo/vista-logo.webp"
            alt="Vista Logo"
            class="h-20 w-auto object-contain"
          />

          <span class="mt-4 text-lg font-semibold text-primary">
            {{ title }}
          </span>
        </div>

        <slot />
      </UCard>
    </div>
  </UApp>
</template>

<script setup lang="ts">
const title = "سامانه ارتباط با مشتریان";
</script>
