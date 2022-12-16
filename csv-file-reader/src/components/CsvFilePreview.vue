<template>
  <!-- <v-container> -->
  <v-row no-gutters>
    <v-col class="text-center">
      <Dialog>
        <template v-slot:activator="{ show, close }">
          <v-btn @click.stop="show">Preview CSV</v-btn>
        </template>
        <v-card>
          <v-card-title>CSV FILE PREVIEW</v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th
                    class="text-left"
                    v-for="(title, index) in componentData.headers"
                    :key="`${title}-${index}`"
                  >
                    {{ title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in componentData.items" :key="item.id">
                  <td v-for="(key, keyIndex) in Object.keys(item)">
                    {{ item[key] }}
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </Dialog>
    </v-col>
  </v-row>
  <!-- </v-container> -->
</template>
<script setup lang="ts">
import { reactive, onMounted, defineProps, withDefaults, watch } from "vue";
import { CsvEntity, csvContants, FileUploaderModelValue } from "@/types";
import { v4 as uuidv4 } from "uuid";
import Dialog from "@/components/Dialog.vue";
interface ICsvFilePreviewComponentProperties {
  modelValue?: FileUploaderModelValue;
}
interface ICsvFilePreviewComponentData {
  csvFile?: FileUploaderModelValue;
  items: CsvEntity[];
  headers: string[];
}
const componentProperties = withDefaults(
  defineProps<ICsvFilePreviewComponentProperties>(),
  {}
);
const componentData = reactive<ICsvFilePreviewComponentData>({
  csvFile: componentProperties.modelValue,
  items: [],
  headers: [],
});

watch(
  () => componentProperties.modelValue,
  (file) => {
    componentData.csvFile = file;
    if (file) parseCsvFile(file);
    else clearData();
  },
  {
    immediate: true,
    deep: true,
  }
);
function clearData() {
  componentData.items = [];
  componentData.headers = [];
}
async function parseCsvFile(file: FileUploaderModelValue) {
  clearData();
  if (!file) return;
  //if (file.type !== "text/csv") return;
  const csvFullContent = await file.text();
  const lines = csvFullContent.split(csvContants.lineBreak);
  if (!lines || lines.length === 0) return;
  await parseHeaders(lines[0]);
  await parseBody(lines.slice(1));
}
async function parseHeaders(headerLine: string) {
  const headers = headerLine.split(csvContants.cellSplit);
  componentData.headers = ["id", ...(headers ?? [])];
}
async function parseBody(bodyLines: string[]) {
  const items = bodyLines
    .map((line) => line.split(csvContants.cellSplit))
    .map((item) => {
      const entity: CsvEntity = {
        id: uuidv4(),
      };
      componentData.headers.slice(1).forEach((header, index) => {
        entity[header] = item[index];
      });
      return entity;
    });
  componentData.items = items ?? [];
}
</script>
