<script setup lang="ts">
import { computed } from "vue";

import { navigation } from "../config/navigation";
import { userController } from "../controllers/user/index.controller";

const links = computed(() => navigation);

onMounted(async () => {
  const token = useCookie<string>("token");
  if (token.value) {
    await userController.getPorfile();
  }
});
</script>

<template>
  <UDashboardGroup unit="rem" class="rtl-dashboard">
    <UDashboardSidebar
      id="default"
      collapsible
      resizable
      class="bg-elevated/25"
      side="left"
      :ui="{
        footer: 'lg:border-t lg:border-default',
      }"
    >
      <template #header="{ collapsed }">
        <div class="flex justify-center w-full">
          <img src="/image/logo/vista-logo.png" />
        </div>
      </template>

      <template #default="{ collapsed }">
        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          tooltip
          popover
          dir="rtl"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[1]"
          orientation="vertical"
          tooltip
          class="mt-auto"
        />
      </template>

      <!-- <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template> -->
    </UDashboardSidebar>

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>

<style scoped>
:global([dir="rtl"] .rtl-dashboard) {
  direction: rtl;
}

:global([dir="rtl"] .rtl-dashboard > *) {
  direction: rtl;
}

:global([dir="rtl"] .rtl-dashboard .lg\:order-1) {
  order: 2;
}

:global([dir="rtl"] [data-navigation-menu]) {
  text-align: right;
}
</style>
