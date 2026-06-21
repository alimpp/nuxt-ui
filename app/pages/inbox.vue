<script setup lang="ts">
import { ticketsController } from "../controllers/tickets/index.controller";
import { departmentsController } from "../controllers/departments/index.controller";

import { useTicketsDS } from "../dataStore/index";
const ticketsStore = useTicketsDS();

import { computed, ref, watch } from "vue";
import { breakpointsTailwind } from "@vueuse/core";

const selectedTab = ref("all");

definePageMeta({
  middleware: "auth",
});

const filteredMails = computed(() => {
  return ticketsStore.getTickets;
});

const mailBoxStateFlag = ref(false);

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("lg");

const paginateController = async (page: number) => {
  await ticketsController.getTickets(page, ticketsStore.getMeta.per_page, ticketsStore.getQuery);
};

onMounted(async () => {
  await ticketsController.getTickets();
  await departmentsController.getDepartments();
});
</script>

<template>
  <UDashboardPanel
    id="inbox-1"
    :default-size="25"
    :min-size="20"
    :max-size="30"
    resizable
  >
    <UDashboardNavbar title="صندوق ورودی">
      <template #leading>
        <UDashboardSidebarCollapse />
      </template>
      <template #right>
        <TicketsFilter />
        <TicketsAddModal />
      </template>
    </UDashboardNavbar>

    <div class="flex flex-col h-full overflow-hidden">
      <div class="flex-1 overflow-y-auto min-h-0">
        <TicketsList />
      </div>
      <div
        v-if="ticketsStore.getMeta && ticketsStore.getMeta.total > 0"
        class="border-t border-gray-200 dark:border-gray-800 p-3 flex justify-center shrink-0"
      >
        <UPagination
          :default-page="ticketsStore.getMeta.page"
          :total="ticketsStore.getMeta.total"
          :items-per-page="ticketsStore.getMeta.per_page"
          @update:page="paginateController"
        />
      </div>
    </div>
  </UDashboardPanel>

  <div class="w-full">
    <ClientOnly>
      <USlideover v-if="isMobile" v-model:open="ticketsStore.getShowMailBox">
        <template #content>
          <TicketsChat class="fade-animation" />
        </template>
      </USlideover>
      <TicketsChat
        v-else-if="ticketsStore.getShowMailBox"
        class="fade-animation"
      />
    </ClientOnly>
  </div>
</template>