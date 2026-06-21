<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

import { customersController } from "../../../controllers/customers/index.controller";

const open = ref(false);
const loading = ref(false);
const toast = useToast();


const schema = z.object({
  fullName: z.string().min(3, "حداقل ۳ کاراکتر").max(100, "حداکثر ۱۰۰ کاراکتر"),

  mobile: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  email: z.email("ایمیل معتبر نیست"),

  password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد"),

  is_active: z.boolean(),
});

type Schema = z.output<typeof schema>;

const fields = [
  {
    name: "fullName",
    label: "نام و نام خانوادگی",
    placeholder: "نام را وارد کنید",
    type: "input",
  },
  {
    name: "mobile",
    label: "موبایل",
    placeholder: "09121111111",
    type: "input",
  },
  {
    name: "email",
    label: "ایمیل",
    placeholder: "example@mail.com",
    type: "input",
  },
  {
    name: "password",
    label: "رمز عبور",
    placeholder: "رمز عبور را وارد کنید",
    type: "password",
  },
  {
    name: "is_active",
    label: "فعال",
    type: "switch",
  },
] as const;

const state = reactive<Schema>({
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  is_active: true,
});

const resetForm = () => {
  Object.assign(state, {
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    is_active: true,
    role_ids: [],
  });
};

watch(open, (value) => {
  if (value) resetForm();
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;

  const response = await customersController.addCustomers({...event.data, role_ids: [1]});

  toast.add({
    title: response.message,
    color: response.success ? "success" : "error",
  });

  if (response.success) {
    resetForm();
    open.value = false;
  }

  loading.value = false;
}
</script>

<template>
  <UModal v-model:open="open" title="ایجاد مشتری">
    <UButton
      icon="i-lucide-plus"
      label="ایجاد مشتری"
      size="md"
      class="rounded-sm cursor-pointer"
      @click="open = true"
    />

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
          :name="field.name"
          :label="field.label"
        >
          <UInput
            v-if="field.type === 'input'"
            v-model="state[field.name]"
            :placeholder="field.placeholder"
            class="w-full"
          />

          <UInput
            v-else-if="field.type === 'password'"
            v-model="state[field.name]"
            type="password"
            :placeholder="field.placeholder"
            class="w-full"
          />

          <USelectMenu
            v-else-if="field.type === 'multi-select'"
            v-model="state[field.name]"
            multiple
            value-key="value"
            label-key="label"
            :items="selectOptions[field.optionsKey]"
            class="w-full"
          />

          <USwitch
            v-else-if="field.type === 'switch'"
            v-model="state[field.name]"
          />
        </UFormField>

        <div class="flex justify-end gap-2 pt-2">
          <UButton
            type="button"
            color="neutral"
            variant="soft"
            @click="open = false"
          >
            انصراف
          </UButton>

          <UButton type="submit" :loading="loading"> ثبت مشتری </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
