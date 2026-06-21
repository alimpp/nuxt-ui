<script setup>
import { ticketsController } from "../../../controllers/tickets/index.controller";

import { computed } from "vue";

import { useTicketsDS } from "../../../dataStore/index";
const ticketsStore = useTicketsDS();

const ticketsList = computed(() => ticketsStore.getTickets);

const selectTicket = async (id) => {
  await ticketsController.getTicketInfo(id, true);
};
</script>

<template>
  <div class="overflow-y-auto divide-y divide-default">
    <div
      v-for="mail in ticketsList"
      :key="mail.id"
      class="px-4 py-3 cursor-pointer transition-colors hover:bg-gray-50"
      :class="{ 'bg-primary-100': mail.id === ticketsStore.getTicketInfo?.id }"
      @click="selectTicket(mail.id)"
    >
      <div class="flex items-start justify-between gap-3">
        <div class="min-w-0 flex-1">
          <div class="flex-col">
            <div class="flex items-center" v-if="mail.customer">
              <UAvatar :alt="mail.customer.avatar" size="sm" color="primary" />
              <span class="text-sm px-2 text-primary">{{ mail.customer.fullName }}</span>
            </div>
            <span class="text-sm font-medium truncate flex py-1">
              {{ mail.title }}
            </span>
          </div>
        </div>

        <div class="text-xs text-gray-400 shrink-0 mt-1" :class="{'mt-2': mail.customer}">
          {{ mail.createdAt }}
        </div>
      </div>

      <div class="mt-3 flex items-center justify-between gap-3">
        <div class="text-xs text-gray-600 shrink-0">
          اولویت:
          <UBadge
            :color="mail.priority.chipColor"
            variant="soft"
            size="lg"
            class="shrink-0 mx-1"
          >
            {{ mail.priority.title }}
          </UBadge>

          <UBadge variant="soft" size="lg" class="shrink-0" color="neutral">
            <span>{{ mail.department.description }}</span>
          </UBadge>
        </div>

        <div class="text-xs text-gray-600 shrink-0">
          وضعیت :
          <UBadge
            :color="mail.status.chipColor"
            variant="soft"
            size="lg"
            class="shrink-0"
          >
            {{ mail.status.title }}
          </UBadge>
        </div>
      </div>
    </div>
  </div>
</template>
