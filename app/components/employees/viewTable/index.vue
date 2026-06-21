<script setup lang="ts">
import type { TableColumn } from "@nuxt/ui";
import type { TEmployee } from "../../../types/employees/index";

const props = defineProps<{
  dataSource: TEmployee[];
  loading?: boolean;
  meta?: any;
}>();

const emit = defineEmits<{
  edit: [employee: TEmployee];
  delete: [employee: TEmployee];
  paginate: [page: number];
}>();

const currentPage = ref(1)

watch(() => props.meta?.page, (val) => {
  currentPage.value = val ?? 1
}, { immediate: true })

const totalPages = computed(() =>
  Math.ceil((props.meta?.total ?? 0) / (props.meta?.per_page ?? 10)),
);

const onPageChange = (page: number) => {  
  currentPage.value = page
  emit('paginate', page)
}

const columns: TableColumn<TEmployee>[] = [
  { accessorKey: "fullName", header: "نام" },
  { accessorKey: "email", header: "ایمیل" },
  { accessorKey: "mobile", header: "موبایل" },
  { accessorKey: "roles", header: "نقش" },
  { accessorKey: "departments", header: "واحد" },
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
        <div class="flex justify-center items-center py-8 text-gray-400 text-sm">
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

      <template #roles-cell="{ row }">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="role in row.original.roles"
            :key="role.id"
            :label="role.description || role.name"
            variant="subtle"
            color="info"
            size="md"
          />
          <span v-if="!row.original.roles.length" class="text-gray-400 text-sm">—</span>
        </div>
      </template>

      <template #departments-cell="{ row }">
        <div class="flex flex-wrap gap-1">
          <UBadge
            v-for="dept in row.original.departments"
            :key="dept.id"
            :label="dept.description || dept.name"
            variant="subtle"
            color="neutral"
            size="md"
          />
          <span v-if="!row.original.departments.length" class="text-gray-400 text-sm">—</span>
        </div>
      </template>

      <template #isActive-cell="{ row }">
        <UBadge
          :label="row.original.isActive === 1 ? 'فعال' : 'غیرفعال'"
          :color="row.original.isActive === 1 ? 'success' : 'error'"
          variant="subtle"
          size="md"
        />
      </template>

      <template #actions-cell="{ row }">
        <div class="flex items-center gap-1">
          <EmployeesViewTableActions />
        </div>
      </template>
    </UTable>
    <div v-if="meta && totalPages > 1" class="flex items-center justify-between px-1">
      <UPagination
        :default-page="currentPage"
        :total="meta.total"
        :items-per-page="meta.per_page"
        @update:page="onPageChange"
      />
    </div>
  </div>
</template>