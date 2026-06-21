<template>
  <UPopover v-model:open="isOpen">
    <UIcon name="qlementine-icons:menu-dots-24" class="size-5 cursor-pointer" />

    <template #content>
      <div class="p-2" dir="rtl">
        <UButton
          variant="ghost"
          color="neutral"
          size="sm"
          leading-icon="i-lucide-copy"
          class="w-full justify-start cursor-pointer"
          @click="copyMessage"
        >
          کپی متن پیام
        </UButton>
      </div>
    </template>
  </UPopover>
</template>

<script setup>
const props = defineProps({
  message: { default: Object },
});

const toast = useToast();
const isOpen = ref(false);

async function copyMessage() {
  const text = props.message?.body?.replace(/<[^>]*>/g, "") ?? "";
  await navigator.clipboard.writeText(text);
  isOpen.value = false;
  toast.add({ title: "کپی شد", icon: "i-lucide-check", color: "success" });
}
</script>