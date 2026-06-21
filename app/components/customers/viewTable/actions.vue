<template>
  <UPopover v-model:open="isOpen">
    <UIcon name="qlementine-icons:menu-dots-24" class="size-5 cursor-pointer" />

    <template #content>
      <div class="p-2" dir="rtl">
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          leading-icon="solar:trash-bin-minimalistic-outline"
          class="w-full justify-start cursor-pointer text-red-600"
        >
          حذف کاربر
        </UButton>
      </div>
    </template>
  </UPopover>
</template>

<script setup>

</script>