<template>
  <Dialog>
    <template v-slot:activator="{ show, close }">
      <v-btn @click.stop="show">Preview CSV</v-btn>
    </template>
    <v-card :elevation="display.smAndDown ? 0 : 1">
      <v-card-title>CSV FILE PREVIEW({{ body.length }})</v-card-title>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th
                class="text-left"
                v-for="(title, index) in headers"
                :key="`${title}-${index}`"
              >
                {{ title }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in body" :key="item.id">
              <td v-for="(key, keyIndex) in Object.keys(item)">
                {{ item[key] }}
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </Dialog>
</template>
<script setup lang="ts">
import { reactive, computed, defineProps, withDefaults } from "vue";
import { FileUploaderModelValue, ProcessedCsvFile, CsvEntity } from "@/types";
import { useVuetifyDisplay } from "@composables/useVuetifyDisplay";
import { useFileStore } from "@store/useFileStore";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@/components/Dialog.vue";

interface ICsvFilePreviewComponentProperties {
  modelValue?: ProcessedCsvFile;
  file?: FileUploaderModelValue;
}
interface ICsvFilePreviewComponentData {
  existingIds: string[];
}
interface CsvEntityWithId extends CsvEntity {
  id: string;
}
const fileStore = useFileStore();
const componentProperties = withDefaults(
  defineProps<ICsvFilePreviewComponentProperties>(),
  {}
);
const componentData = reactive<ICsvFilePreviewComponentData>({
  existingIds: [],
});

const display = useVuetifyDisplay();
const headers = computed<string[]>(() => {
  const persistedHeaders = componentProperties.modelValue?.headers ?? [];
  if (persistedHeaders.length === 0) return [];
  return [...persistedHeaders];
});
function generateNewValidId() {
  if (!componentData.existingIds) return uuidv4();
  let newId = uuidv4();
  while (componentData.existingIds.includes(newId)) newId = uuidv4();

  return newId;
}
const body = computed<CsvEntityWithId[]>(() => {
  const persistedBody = componentProperties.modelValue?.body ?? [];
  if (persistedBody.length === 0) return [];
  return persistedBody.map((item) => {
    return {
      id: generateNewValidId(),
      ...item,
    };
  });
});
</script>
