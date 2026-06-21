<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { TCustomer } from "../../../types/customers/index";

const props = defineProps<{
  dataSource: TCustomer[];
  loading?: boolean;
  meta?: any;
}>();

const emit = defineEmits<{
  edit: [customer: TCustomer];
  delete: [customer: TCustomer];
  paginate: [page: number];
}>();

const currentPage = ref(1);

watch(
  () => props.meta?.page,
  (val) => {
    currentPage.value = val ?? 1;
  },
  { immediate: true },
);

const totalPages = computed(() =>
  Math.ceil((props.meta?.total ?? 0) / (props.meta?.per_page ?? 10)),
);

const onPageChange = (page: number) => {
  currentPage.value = page;
  emit("paginate", page);
};

const columns: TableColumn<TCustomer>[] = [
  { accessorKey: "fullName", header: "نام" },
  { accessorKey: "email", header: "ایمیل" },
  { accessorKey: "mobile", header: "موبایل" },
  { accessorKey: "isActive", header: "وضعیت" },
  { id: "actions", header: "" },
];
</script>

<template>
  <div class="flex flex-col gap-4">
    <UTable
      :data="props.dataSource"
      :columns="columns"
      :loading="props.loading"
    >
      <template #empty>
        <div
          class="flex justify-center items-center py-8 text-gray-400 text-sm"
        >
          داده‌ای وجود ندارد
        </div>
      </template>

      <template #fullName-cell="{ row }">
        <div class="flex items-center gap-2">
          <UAvatar :alt="row.original.fullName[0].toUpperCase()" size="sm" />
          <span class="font-medium">{{ row.original.fullName }}</span>
        </div>
      </template>

      <template #email-cell="{ row }">
        <span class="text-gray-500 dark:text-gray-400 text-sm">
          {{ row.original.email }}
        </span>
      </template>

      <template #mobile-cell="{ row }">
        <span dir="ltr" class="text-sm">{{ row.original.mobile }}</span>
      </template>

      <template #isActive-cell="{ row }">
        <UBadge
          :label="row.original.isActive ? 'فعال' : 'غیرفعال'"
          :color="row.original.isActive ? 'success' : 'error'"
          variant="subtle"
          size="md"
        />
      </template>

      <template #actions-cell="{ row }">
        <div class="flex items-center gap-1">
          <CustomersViewTableActions />
        </div>
      </template>
    </UTable>

    <div
      v-if="meta && totalPages > 1"
      class="flex items-center justify-between px-1"
    >
      <UPagination
        :default-page="currentPage"
        :total="meta.total"
        :items-per-page="meta.per_page"
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>
