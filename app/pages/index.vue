<script setup lang="ts">
import { useUserDS } from "../dataStore/index";
const userStore = useUserDS();

definePageMeta({
  middleware: "auth",
});

import { sub } from "date-fns";
import type { DropdownMenuItem } from "@nuxt/ui";
import type { Period, Range } from "~/types";

const { isNotificationsSlideoverOpen } = useDashboard();

const items = [
  [
    {
      label: "تیکت ها",
      icon: "i-lucide-send",
      to: "/inbox",
    },
    {
      label: "ثبت کاربر",
      icon: "i-lucide-user-plus",
      to: "/customers",
    },
  ],
] satisfies DropdownMenuItem[][];

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
