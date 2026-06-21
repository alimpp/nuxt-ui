<script setup lang="ts">
import { employeesController } from "../../../controllers/employees/index.controller";

import { useEmployeesDS } from '../../../dataStore/index'
const employeesStore = useEmployeesDS()

const open = ref(false);
const searchQuery = ref("");
const searchHistory = ref<string[]>([]);

const STORAGE_KEY = "employee_search_history";
const MAX_HISTORY = 8;

onMounted(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) searchHistory.value = JSON.parse(saved);
});

const saveToHistory = (query: string) => {
  const trimmed = query.trim();
  if (!trimmed) return;

  const filtered = searchHistory.value.filter((q) => q !== trimmed);
  const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
  searchHistory.value = updated;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

const handleSubmit = async () => {
  const trimmed = searchQuery.value.trim();
  if (!trimmed) return;
  saveToHistory(trimmed);
  await employeesController.getEmployess(1, 10, trimmed);
  employeesStore.setLastSearchField(`جستجو براساس ${trimmed}`)
  open.value = false
};

const selectFromHistory = (query: string) => {
  searchQuery.value = query;
  handleSubmit();
};

const removeFromHistory = (query: string) => {
  searchHistory.value = searchHistory.value.filter((q) => q !== query);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(searchHistory.value));
};
</script>

<template>
  <UModal v-model:open="open" title="جستجوی کارمند">
    <UButton
      icon="mingcute:search-line"
      label="جستجو کارمند"
      size="md"
      class="rounded-sm cursor-pointer bg-blue-400"
      @click="open = true"
    />

    <template #body>
      <div class="flex flex-col gap-4">
        <div class="flex gap-2">
          <UInput
            v-model="searchQuery"
            placeholder="نام، ایمیل، شماره تلفن..."
            class="flex-1"
            size="md"
            @keyup.enter="handleSubmit"
          />
          <UButton
            label="جستجو"
            size="md"
            class="cursor-pointer"
            @click="handleSubmit"
          />
        </div>

        <div v-if="searchHistory.length" class="flex flex-col gap-2">
          <span class="text-xs text-gray-400">جستجوهای اخیر</span>
          <div class="flex flex-wrap gap-2">
            <UBadge
              v-for="query in searchHistory"
              :key="query"
              :label="query"
              variant="subtle"
              color="neutral"
              class="cursor-pointer"
              @click="selectFromHistory(query)"
            >
              <template #trailing>
                <UIcon
                  name="i-lucide-x"
                  class="size-3 cursor-pointer hover:text-red-400"
                  @click.stop="removeFromHistory(query)"
                />
              </template>
            </UBadge>
          </div>
        </div>
      </div>
    </template>
  </UModal>
</template>
