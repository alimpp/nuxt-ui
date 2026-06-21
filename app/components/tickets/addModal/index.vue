<script setup lang="ts">
import { ticketsController } from "../../../controllers/tickets/index.controller";
import { useDepartmentsDS } from "../../../dataStore/index";

const departmentsStore = useDepartmentsDS();

import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const open = ref(false);
const loading = ref(false);
const toast = useToast();

const priorityOptions = [
  { label: "کم", value: 1 },
  { label: "متوسط", value: 2 },
  { label: "زیاد", value: 3 },
];

const departmentsList = computed(() => departmentsStore.getDepartmentsOptions);

const schema = z.object({
  title: z.string().min(3, "حداقل ۳ کاراکتر").max(50, "حداکثر 50 کاراکتر"),
  priority_id: z.number().refine((val) => [1, 2, 3].includes(val)),
  department_id: z.number({ message: "دپارتمان را انتخاب کنید" }),
  body: z.string().min(10, "حداقل ۱۰ کاراکتر").max(1000, "حداکثر ۱۰۰۰ کاراکتر"),
});

type Schema = z.output<typeof schema>;

const fields = [
  {
    name: "title",
    label: "عنوان تیکت",
    placeholder: "عنوان تیکت را وارد کنید",
    type: "input",
  },
  {
    name: "department_id",
    label: "دپارتمان",
    type: "select",
    optionsKey: "departments",
  },
  {
    name: "priority_id",
    label: "اولویت",
    type: "select",
    optionsKey: "priorities",
  },
  {
    name: "body",
    label: "متن تیکت",
    placeholder: "متن تیکت را وارد کنید",
    type: "editor",
  },
] as const;

const selectOptions = computed(() => ({
  departments: departmentsList.value,
  priorities: priorityOptions,
}));

const state = reactive<Schema>({
  title: "",
  priority_id: 1,
  department_id: departmentsList.value[0]?.value ?? 0,
  body: "",
});

const resetForm = () => {
  Object.assign(state, {
    title: "",
    priority_id: 1,
    department_id: departmentsList.value[0]?.value ?? 0,
    body: "",
  });
};

watch(open, (newVal) => {
  if (newVal) resetForm();
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;
  const serverResponse = await ticketsController.addTicket(event.data);

  toast.add({
    title: serverResponse.message,
    color: serverResponse.success ? "success" : "error",
  });

  if (serverResponse.success) {
    resetForm();
    open.value = false;
  }
  loading.value = false;
}
</script>

<template>
  <UModal v-model:open="open" title="ثبت تیکت جدید">
    <UButton label="ایجاد تیکت" class="cursor-pointer" @click="open = true" />

    <template #body>
      <UForm
        :schema="schema"
        :state="state"
        class="space-y-4"
        @submit="onSubmit"
      >
        <UFormField
          v-for="field in fields"
          :key="field.name"
          :label="field.label"
          :name="field.name"
        >
          <UInput
            v-if="field.type === 'input'"
            v-model="state[field.name]"
            :placeholder="field.placeholder"
            class="w-full"
          />

          <USelect
            v-else-if="field.type === 'select'"
            v-model="state[field.name]"
            :items="selectOptions[field.optionsKey]"
            class="w-full"
          />

          <template v-else-if="field.type === 'editor'">
            <ClientOnly>
              <TextEditor
                v-model="state[field.name]"
                :placeholder="field.placeholder"
              />
              <template #fallback>
                <UTextarea
                  v-model="state[field.name]"
                  class="w-full"
                  :rows="5"
                />
              </template>
            </ClientOnly>
          </template>
        </UFormField>

        <div class="flex justify-end gap-2 pt-2">
          <UButton
            type="button"
            color="neutral"
            variant="soft"
            @click="open = false"
            >انصراف</UButton
          >
          <UButton type="submit" :loading="loading">ثبت تیکت</UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
