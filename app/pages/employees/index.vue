<script setup lang="ts">
import { departmentsController } from "../../controllers/departments/index.controller";
import { employeesController } from "../../controllers/employees/index.controller";
import { rolesController } from "../../controllers/roles/index.controller";

import { useEmployeesDS } from "../../dataStore/index";
const employeesStore = useEmployeesDS();

definePageMeta({
  middleware: "auth",
});

const { isNotificationsSlideoverOpen } = useDashboard();

const paginateController = async (page: number) => {
  await employeesController.getEmployess(
    page,
    employeesStore.getMeta.per_page,
    "",
  );
};

const resetTable = async () => {
  employeesStore.setLastSearchField('')
  await employeesController.getEmployess(
    1,
    employeesStore.getMeta.per_page,
    "",
  );
};

onMounted(async () => {
  await employeesController.getEmployess(
    employeesStore.getMeta.page,
    employeesStore.getMeta.per_page,
    "",
  );
  await departmentsController.getDepartments();
  await rolesController.getRoles();
});
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="کارمندان" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <Profile />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div class="flex flex-col">
        <div class="flex justify-end">
          <UBadge
            v-if="employeesStore.getLastSearchField"
            :label="employeesStore.getLastSearchField"
            variant="subtle"
            color="neutral"
            class="cursor-pointer"
          >
            <template #trailing>
              <UIcon
                name="i-lucide-x"
                class="size-3 cursor-pointer hover:text-red-400"
                @click.stop="resetTable"
              />
            </template>
          </UBadge>
          <EmployeesSearch class="mx-2" />
          <EmployeesAddInternalUserModal />
        </div>
        <EmployeesViewTable
          class="mt-2"
          :dataSource="employeesStore.getEmployees"
          :loading="employeesStore.getLoading"
          :meta="employeesStore.getMeta"
          @paginate="paginateController"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
