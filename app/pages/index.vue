<script setup lang="ts">
import { customersController } from '../controllers/customers/index.controller'

import { useUserDS } from "../dataStore/index";
const userStore = useUserDS();

definePageMeta({
  middleware: "auth",
});

const { isNotificationsSlideoverOpen } = useDashboard();

onMounted( async () => {
  await customersController.getCustomers()
})
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="خانه" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
            <Profile />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body> </template>
  </UDashboardPanel>
</template>
