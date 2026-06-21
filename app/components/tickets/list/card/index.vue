<template>
  <div
    class="flex w-full justify-end"
    :class="{ 'justify-start': userStore.getUser.id === message.senderId }"
  >
    <UCard
      class="w-fit max-w-[380px] md:max-w-[600px]"
      :class="
        userStore.getUser.id === message.senderId
          ? 'bg-primary-100 dark:bg-primary-950'
          : 'bg-gray-100 dark:bg-gray-800'
      "
      :ui="{ body: 'p-2 sm:p-3' }"
    >
      <div class="w-full flex">
        <div class="flex w-full items-center">
          <UAvatar :alt="message.sender.avatar" size="sm" color="primary" />
          <div class="flex flex-col px-1">
            <span class="text-xs text-primary-600 dark:text-primary-400">
              {{ message.sender.fullName }}
            </span>
          </div>
        </div>
        <div class="flex">
          <TicketsListCardActions :message="message" />
        </div>
      </div>

      <div
        class="flex flex-col mt-2 px-2 py-2 rounded-md"
        :class="
          userStore.getUser.id === message.senderId
            ? 'bg-primary-200 dark:bg-primary-900'
            : 'bg-gray-200 dark:bg-gray-700'
        "
      >
        <span
          class="text-xs break-words text-gray-800 dark:text-gray-100 message-body"
          v-html="message.renderedBody"
        />
      </div>

      <div class="flex justify-end text-xs text-gray-400 dark:text-gray-500 mt-2">
        {{ message.createdAt }}
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { useUserDS } from "../../../../dataStore/index";
const userStore = useUserDS();

defineProps({
  message: {
    type: Object,
    required: true,
  },
});
</script>