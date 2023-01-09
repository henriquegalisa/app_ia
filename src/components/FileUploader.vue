<template>
  <v-row no-gutters justify="center" align="center">
    <v-col class="text-center">
      <v-container>
        <v-row>
          <v-spacer />
          <v-col cols="6">
            <v-file-input
              v-model="componentData.files"
              label="File input"
              prepend-icon="mdi-file"
              outlined
              dense
              :clearable="false"
              show-size
              @change="fileUploaded"
            ></v-file-input>
          </v-col>
          <v-col cols="2">
            <v-btn @click="clearFile"><v-icon>mdi-close</v-icon></v-btn>
          </v-col>
          <v-spacer />
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { reactive, defineProps, defineEmits, withDefaults } from "vue";
import { FileUploaderModelValue } from "@/types";
export interface IFileUploaderComponentProperties {
  modelValue?: FileUploaderModelValue;
}
export interface IFileUploaderComponentData {
  files: File[];
}
export interface IFileUploaderComponentEvents {
  (e: "update:modelValue", file: FileUploaderModelValue): void;
  (e: "fileUploaded", file: FileUploaderModelValue): void;
}

const componentProperties = withDefaults(
  defineProps<IFileUploaderComponentProperties>(),
  {}
);
const componentData = reactive<IFileUploaderComponentData>({
  files: [],
});
const emits = defineEmits<IFileUploaderComponentEvents>();
function clearFile() {
  componentData.files = [];
  emits("update:modelValue", null);
}
function fileUploaded() {
  if (!componentData?.files || componentData?.files?.length === 0) return;
  emits("fileUploaded", componentData.files[0]);
  emits("update:modelValue", componentData.files[0]);
}
</script>
