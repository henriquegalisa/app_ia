<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row class="fill-height">
          <v-container class="fill-height">
            <v-app-bar title="CSV FILE READER">
              <template v-slot:prepend>
                <v-app-bar-nav-icon
                  @click.stop="toogleNavigation"
                ></v-app-bar-nav-icon>
              </template>
            </v-app-bar>
            <v-navigation-drawer v-model="showNavigationDrawer">
              <Menu :csv-file="uploadedFile"
            /></v-navigation-drawer>
            <FileUploader v-model="uploadedFile" />
            <CsvFilePreview v-model="uploadedFile" />
          </v-container>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { FileUploaderModelValue } from "@/types";
import FileUploader from "@components/FileUploader.vue";
import Menu from "@components/Menu.vue";
import CsvFilePreview from "@components/CsvFilePreview.vue";
const uploadedFile = ref<FileUploaderModelValue>();
const showNavigationDrawer = ref<boolean>(false);

watch(uploadedFile, (file) => {
  console.log(file);
});
function toogleNavigation() {
  showNavigationDrawer.value = !showNavigationDrawer.value;
}
</script>
