<template>
  <v-list>
    <v-list-group :value="true" v-model="expandedGroup">
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props" title="Upload">
          <template v-slot:prepend>
            <v-icon>mdi-upload</v-icon>
          </template>
        </v-list-item>
      </template>
      <Matrix v-model="componentProperties.csvFile" />
      <Scatter v-model="componentProperties.csvFile" />
      <RegressionLinear v-model="componentProperties.csvFile" />
    </v-list-group>
  </v-list>
</template>
<script setup lang="ts">
import { defineProps, withDefaults, ref } from "vue";
import { FileUploaderModelValue } from "@/types";
import CsvFilePreview from "@components/CsvFilePreview.vue";
import Matrix from "@components/Matrix.vue";
import Scatter from "@components/Scatter.vue";
import RegressionLinear from "@components/RegressionLinear.vue";

interface IMenuComponentProperties {
  csvFile?: FileUploaderModelValue;
}
const componentProperties = withDefaults(
  defineProps<IMenuComponentProperties>(),
  {}
);
const expandedGroup = ref<string>("group-upload");
</script>
