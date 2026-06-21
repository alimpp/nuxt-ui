<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

import { useDepartmentsDS } from "../../../dataStore";
import { useRolesDS } from '../../../dataStore/index'
import { employeesController } from "../../../controllers/employees/index.controller";

const departmentsStore = useDepartmentsDS();
const rolesStore = useRolesDS()

const open = ref(false);
const loading = ref(false);
const toast = useToast();

const departmentsList = computed(() => departmentsStore.getDepartmentsOptions);
const rolesList = computed(() => rolesStore.getRolesOptions);

const schema = z.object({
  fullName: z.string().min(3, "حداقل ۳ کاراکتر").max(100, "حداکثر ۱۰۰ کاراکتر"),

  mobile: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  email: z.email("ایمیل معتبر نیست"),

  password: z.string().min(8, "رمز عبور حداقل ۸ کاراکتر باشد"),

  is_active: z.boolean(),

  role_ids: z.array(z.number()).min(1, "حداقل یک نقش انتخاب کنید"),

  department_ids: z.array(z.number()).min(1, "حداقل یک دپارتمان انتخاب کنید"),
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
    name: "role_ids",
    label: "نقش‌ها",
    type: "multi-select",
    optionsKey: "roles",
  },
  {
    name: "department_ids",
    label: "دپارتمان‌ها",
    type: "multi-select",
    optionsKey: "departments",
  },
  {
    name: "is_active",
    label: "فعال",
    type: "switch",
  },
] as const;

const selectOptions = computed(() => ({
  roles: rolesList.value,
  departments: departmentsList.value,
}));

const state = reactive<Schema>({
  fullName: "",
  mobile: "",
  email: "",
  password: "",
  is_active: true,
  role_ids: [],
  department_ids: [],
});

const resetForm = () => {
  Object.assign(state, {
    fullName: "",
    mobile: "",
    email: "",
    password: "",
    is_active: true,
    role_ids: [],
    department_ids: [],
  });
};

watch(open, (value) => {
  if (value) resetForm();
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  loading.value = true;

  const response = await employeesController.addEmployee(event.data);

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
  <UModal v-model:open="open" title="ایجاد کاربر داخلی">
    <UButton
      icon="i-lucide-plus"
      label="ایجاد کارمند"
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

          <UButton type="submit" :loading="loading"> ثبت کاربر </UButton>
        </div>
      </UForm>
    </template>
  </UModal>
</template>
