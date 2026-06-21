<script setup lang="ts">
import { ticketsController } from "../../../controllers/tickets/index.controller";

import { ref, defineEmits, nextTick, onMounted, watch } from "vue";

import { breakpointsTailwind } from "@vueuse/core";

import { useTicketsDS } from "../../../dataStore/index";

const ticketsStore = useTicketsDS();

defineEmits(["close"]);

const toast = useToast();

const replayMessage = ref("");
const loading = ref(false);

const breakpoints = useBreakpoints(breakpointsTailwind);
const isMobile = breakpoints.smaller("lg");

const messagesContainer = ref<HTMLElement | null>(null);

const scrollToBottom = async () => {
  await nextTick();

  requestAnimationFrame(() => {
    if (!messagesContainer.value) return;

    messagesContainer.value.scrollTo({
      top: messagesContainer.value.scrollHeight,
      behavior: "smooth",
    });
  });
};

onMounted(async () => {
  await scrollToBottom();
});

watch(
  () => ticketsStore.getTicketInfo?.messages?.length,
  async () => {
    await scrollToBottom();
  },
);

const onSubmit = async () => {
  const message = replayMessage.value.trim();
  const plainText = message.replace(/<[^>]*>/g, "").trim();

  if (!plainText || loading.value) return;

  loading.value = true;

  try {
    const serverResponse = await ticketsController.replayickets(
      ticketsStore.getTicketInfo.id,
      message,
    );

    toast.add({
      title: serverResponse.message,
      color: serverResponse.success ? "success" : "error",
    });

    if (serverResponse.success) {
      replayMessage.value = "";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <UDashboardPanel id="inbox-2" class="flex flex-col h-full overflow-hidden">
    <div class="shrink-0 border-b border-default p-4 sm:px-6">
      <div class="flex items-start justify-between gap-4 w-full">
        <div class="min-w-0">
          <div class="flex items-center">
            <UIcon
              v-if="isMobile"
              name="solar:arrow-right-linear"
              class="size-6 cursor-pointer"
              @click="ticketsStore.resetTicketInfo()"
            />

            <p class="font-semibold text-highlighted px-1">
              {{ ticketsStore.getTicketInfo?.title }}
            </p>
          </div>

          <p class="text-muted text-sm mt-2">
            {{ ticketsStore.getTicketInfo?.createdAt }}
          </p>
        </div>

        <div />
      </div>
    </div>

    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 sm:p-6">
      <TicketsListCard
        v-for="message in ticketsStore.getTicketInfo?.messages"
        :key="message.id"
        :message="message"
        class="mb-3"
      />
    </div>

    <div class="shrink-0 p-4 sm:px-6 border-t border-default">
      <UCard
        variant="subtle"
        class="w-full"
        :ui="{ header: 'flex items-center gap-1.5 text-dimmed' }"
      >
        <template #header>
          <UIcon name="i-lucide-reply" class="size-5" />

          <span class="text-sm truncate">
            پاسخ به تیکت {{ ticketsStore.getTicketInfo?.title }}
          </span>
        </template>

        <ClientOnly>
          <TextEditor
            v-model="replayMessage"
            placeholder="پاسخ به تیکت را بنویسید..."
          />

          <template #fallback>
            <UTextarea
              v-model="replayMessage"
              color="neutral"
              variant="none"
              autoresize
              placeholder="پاسخ به تیکت"
              :rows="4"
              class="w-full"
            />
          </template>
        </ClientOnly>

        <div class="flex items-center justify-between mt-4">
          <UTooltip text="ارسال فایل و داکیومنت">
            <UButton
              class="cursor-pointer"
              color="neutral"
              variant="ghost"
              icon="i-lucide-paperclip"
              disabled
            />
          </UTooltip>

          <UButton
            color="neutral"
            :loading="loading"
            label="ارسال"
            icon="i-lucide-send"
            class="cursor-pointer"
            @click="onSubmit"
          />
        </div>
      </UCard>
    </div>
  </UDashboardPanel>
</template>
