<template>
  <Dialog v-model="componentData.showUploadDialog">
    <template v-slot:activator="{ show, close }">
      <v-list-item @click.stop="show" title="Matrix"> </v-list-item>
    </template>
    <v-card>
      <v-card-title>Matrix Linear</v-card-title>
      <v-card-text>
        <v-form ref="matrixForm" v-model="componentData.valid">
          <v-select
            :items="availableResultTypes"
            v-model="componentData.result"
            label="Result Type"
          />
          <v-card-actions>
            <v-spacer />
            <v-btn @click.stop="uploadFile">Upload to Api - Matrix</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </Dialog>
  <Dialog v-model="componentData.showResultDialog">
    <v-card>
      <v-card-title>Matrix - Result</v-card-title>
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
  ref,
  reactive,
  defineProps,
  withDefaults,
  watch,
  computed,
  nextTick,
  onMounted,
} from "vue";
import {
  FileUploaderModelValue,
  apiConfigurations,
  MatrixResultTypes,
} from "@/types";

import Dialog from "@/components/Dialog.vue";
interface IRegressionLinearComponentProperties {
  modelValue?: FileUploaderModelValue;
}
interface IRegressionLinearComponentData {
  csvFile?: FileUploaderModelValue;
  showUploadDialog: boolean;
  showResultDialog: boolean;
  imageUrl?: string;
  result?: MatrixResultTypes;
  error?: any;
  valid: boolean;
  isMounted: boolean;
}
const componentProperties = withDefaults(
  defineProps<IRegressionLinearComponentProperties>(),
  {}
);
const componentData = reactive<IRegressionLinearComponentData>({
  csvFile: componentProperties.modelValue,
  showResultDialog: false,
  showUploadDialog: false,
  valid: false,
  isMounted: false,
});
const newItemForm = ref();
const imageUrl = computed(() => {
  return componentData.imageUrl;
});
const availableResultTypes = computed(() => {
  return Object.values(MatrixResultTypes);
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
    const endpoint = `confusion/matrix?result=${componentData.result}`;
    const formData = new FormData();
    formData.append("file", componentData.csvFile as Blob);
    const result = await apiHandler.post(endpoint, formData);
    if (result.status !== 200) return;

    componentData.imageUrl = result.data;
    componentData.showResultDialog = true;
    console.log(result);
  } catch (err) {
    componentData.error = err;
  } finally {
    componentData.showUploadDialog = false;
  }
  await nextTick();
}
function validateForm() {
  if (!componentData.isMounted) return;
  newItemForm.value.validate();
}
onMounted(() => {
  componentData.isMounted = true;
});
</script>
