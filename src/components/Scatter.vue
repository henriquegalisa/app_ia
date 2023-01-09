<template>
  <Dialog v-model="componentData.showUploadDialog">
    <template v-slot:activator="{ show, close }">
      <v-list-item @click.stop="show" title="Scatter"> </v-list-item>
    </template>
    <v-card>
      <v-card-title>Regression Linear</v-card-title>
      <v-card-text>
        <v-text-field v-model="componentData.x" label="x" />
        <v-text-field v-model="componentData.y" label="y" />
        <v-btn @click.stop="uploadFile">Upload to Api - Scatter</v-btn>
      </v-card-text>
    </v-card>
  </Dialog>
  <Dialog v-model="componentData.showResultDialog">
    <v-card>
      <v-card-title>Scatter - Result</v-card-title>
      <v-card-text v-if="!componentData.error">
        <v-img
          :src="imageUrl"
          :aspect-ratio="16 / 9"
          class="bg-grey-lighten-2"
        ></v-img>
        <v-list>
          <v-list-item :to="imageUrl" target="_blank">
            <v-list-item-title class="text-center"
              >Load Image</v-list-item-title
            >
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text v-else>
        {{ componentData.error }}
      </v-card-text>
    </v-card>
  </Dialog>
</template>
<script setup lang="ts">
import axios from "axios";
import {
  reactive,
  defineProps,
  withDefaults,
  watch,
  computed,
  nextTick,
} from "vue";
import { CsvEntity, FileUploaderModelValue, apiConfigurations } from "@/types";

import Dialog from "@/components/Dialog.vue";
interface IRegressionLinearComponentProperties {
  modelValue?: FileUploaderModelValue;
}
interface IRegressionLinearComponentData {
  csvFile?: FileUploaderModelValue;
  showUploadDialog: boolean;
  showResultDialog: boolean;
  imageUrl?: string;
  x?: string;
  y?: string;
  error?: any;
}
const componentProperties = withDefaults(
  defineProps<IRegressionLinearComponentProperties>(),
  {}
);
const componentData = reactive<IRegressionLinearComponentData>({
  csvFile: componentProperties.modelValue,
  showResultDialog: false,
  showUploadDialog: false,
});
const imageUrl = computed(() => {
  return componentData.imageUrl;
});
watch(
  () => componentProperties.modelValue,
  (file) => {
    componentData.csvFile = file;
  },
  {
    immediate: true,
    deep: true,
  }
);
async function uploadFile(show: Function, close: Function) {
  try {
    const apiHandler = axios.create({
      baseURL: apiConfigurations.baseUrl,
      headers: {
        "Content-Type": "Content-Type: multipart/form-data",
        Accept: "application/json",
      },
    });
    const endpoint = `scatter?x=${componentData.x}&y=${componentData.y}`;
    const formData = new FormData();
    formData.append("file", componentData.csvFile as Blob);
    const result = await apiHandler.post(endpoint, formData);
    if (result.status !== 200) return;
    componentData.imageUrl = result.data;
    componentData.showResultDialog = true;
  } catch (err) {
    console.log("err");
  } finally {
    componentData.showUploadDialog = false;
  }
  await nextTick();
}
</script>
