<script setup lang="ts">
import { customersController } from "../../controllers/customers/index.controller";
import { rolesController } from "../../controllers/roles/index.controller";

import { useCustomersDS } from "../../dataStore/index";
const customersStore = useCustomersDS();

definePageMeta({
  middleware: "auth",
});

const { isNotificationsSlideoverOpen } = useDashboard();

const paginateController = async (page: number) => {
  await customersController.getCustomers(
    page,
    customersStore.getMeta.per_page,
    "",
  );
};

const resetTable = async () => {
  customersStore.setLastSearchField('')
  await customersController.getCustomers(
    1,
    customersStore.getMeta.per_page,
    "",
  );
};

onMounted(async () => {
  await customersController.getCustomers(
    customersStore.getMeta.page,
    customersStore.getMeta.per_page,
    "",
  );
  await rolesController.getRoles();
});
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="مشتریان" :ui="{ right: 'gap-3' }">
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
            v-if="customersStore.getLastSearchField"
            :label="customersStore.getLastSearchField"
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
          <CustomersSearch class="mx-2" />
          <CustomersAddCustomerModal />
        </div>
        <CustomersViewTable
          class="mt-2"
          :dataSource="customersStore.getCustomers"
          :loading="customersStore.getLoading"
          :meta="customersStore.getMeta"
          @paginate="paginateController"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
