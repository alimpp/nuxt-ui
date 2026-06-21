<script setup lang="ts">
import { ticketsController } from "../../../controllers/tickets/index.controller";

import { useTicketsDS } from "../../../dataStore/index";
const ticketsStore = useTicketsDS();

import { useDepartmentsDS } from "../../../dataStore/index";
import { computed } from "vue";
const departmentsStore = useDepartmentsDS();

const open = ref(false);

const filters = reactive({
  search: "",
  status: null as number | null,
  department_id: null as number | null,
  priority_id: null as number | null,
  assigned_to_id: null as number | null,
  customer_id: null as number | null,
});

const statusOptions = [
  { label: "باز", value: "open" },
  { label: "در انتظار مشتری", value: "pending_customer" },
  { label: "در انتظار بررسی", value: "pending_internal" },
];

const departmentOptions = computed(() => {
  return departmentsStore.getDepartmentsOptions;
});

const priorityOptions = [
  { label: "کم", value: 1 },
  { label: "عادی", value: 2 },
  { label: "زیاد", value: 3 },
];

const assignedToOptions = [
  { label: "علی", value: 1 },
  { label: "رضا", value: 2 },
];

const customerOptions = [
  { label: "مشتری اول", value: 1 },
  { label: "مشتری دوم", value: 2 },
];

const onSearch = () => {
  const params = new URLSearchParams();
  ticketsStore.resetMeta();
  if (filters.search) params.set("search", filters.search);
  if (filters.status !== null) params.set("status", String(filters.status));
  if (filters.department_id !== null)
    params.set("department_id", String(filters.department_id));
  if (filters.priority_id !== null)
    params.set("priority_id", String(filters.priority_id));
  if (filters.assigned_to_id !== null)
    params.set("assigned_to_id", String(filters.assigned_to_id));
  if (filters.customer_id !== null)
    params.set("customer_id", String(filters.customer_id));
  ticketsStore.setQuery(params.toString());
  ticketsController.getTickets(1, 10, params.toString());
  open.value = false;
};

const onReset = () => {
  filters.search = "";
  filters.status = null;
  filters.department_id = null;
  filters.priority_id = null;
  filters.assigned_to_id = null;
  filters.customer_id = null;
  ticketsController.getTickets(1, 10, "");
};
</script>

<template>
  <USlideover v-model:open="open" title="فیلتر تیکت ها" side="left">
    <UButton
      icon="solar:filter-broken"
      label="فیلتر تیکت ها"
      size="md"
      class="rounded-sm cursor-pointer bg-blue-400"
      @click="open = true"
    />

    <template #body>
      <div class="flex flex-col">
        <UFormField label="جستجو">
          <UInput
            v-model="filters.search"
            placeholder="جستجو..."
            class="w-full"
          />
        </UFormField>

        <UFormField label="وضعیت" class="mt-3">
          <URadioGroup
            v-model="filters.status"
            :items="statusOptions"
            value-key="value"
          />
        </UFormField>

        <UFormField label="دپارتمان" class="mt-3">
          <USelectMenu
            v-model="filters.department_id"
            :items="departmentOptions"
            value-key="value"
            placeholder="انتخاب دپارتمان"
            class="w-full"
            clear
          />
        </UFormField>

        <UFormField label="اولویت" class="mt-3">
          <URadioGroup
            v-model="filters.priority_id"
            :items="priorityOptions"
            value-key="value"
          />
        </UFormField>
      </div>
    </template>

    <template #footer>
      <div class="flex gap-2 p-4 w-full">
        <UButton
          label="جستجو"
          class="flex-1 justify-center"
          @click="onSearch"
        />
        <UButton
          label="پاک کردن"
          color="neutral"
          variant="outline"
          class="flex-1 justify-center"
          @click="onReset"
        />
      </div>
    </template>
  </USlideover>
</template>
