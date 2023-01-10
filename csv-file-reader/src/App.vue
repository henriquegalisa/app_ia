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
              <Menu :csv-file="persistedFile"
            /></v-navigation-drawer>
            <FileUploader v-model="persistedFile" />
            <div v-if="persistedFile">
              <v-row no-gutters justify="center" align="center">
                <v-spacer />
                <v-col>
                  <CsvFilePreview v-model="fileStore.data.value" />
                </v-col>
                <v-col>
                  <NewItem
                    :file="persistedFile"
                    @on-save-clicked="onNewItemAdded"
                  />
                </v-col>
                <v-spacer />
              </v-row>
            </div>
          </v-container>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useFileStore } from "@store/useFileStore";
import { CsvEntity, FileUploaderModelValue } from "@/types";
import { useCsvParser, useCsvWriter } from "@composables/useCsvParser";
import FileUploader from "@components/FileUploader.vue";
import Menu from "@components/Menu.vue";
import CsvFilePreview from "@components/CsvFilePreview.vue";
import NewItem from "@components/NewItem.vue";
const fileStore = useFileStore();
const persistedFile = ref<FileUploaderModelValue>();

const showNavigationDrawer = ref<boolean>(false);
const internalChange = ref<boolean>(false);
watch(
  () => persistedFile.value,
  async (uploadedFile: FileUploaderModelValue) => {
    if (internalChange.value) {
      internalChange.value = false;
      return;
    }
    persistedFile.value = uploadedFile;
    if (!persistedFile) return;
    fileStore.clearData();
    const parsedCsv = await useCsvParser(uploadedFile);
    if (!parsedCsv) return;
    const { headers, body } = parsedCsv;
    if (!fileStore.data.value)
      fileStore.data.value = fileStore.createEmptyProcessedCdFile();
    fileStore.data.value.headers = headers;
    fileStore.data.value.body = body;
  },
  {
    deep: true,
  }
);

watch(
  () => fileStore.data.value,
  async (processedCsvFile) => {
    if (!processedCsvFile) return;
    internalChange.value = true;
    persistedFile.value = await useCsvWriter(processedCsvFile);
  },
  {
    deep: true,
  }
);
function toogleNavigation() {
  showNavigationDrawer.value = !showNavigationDrawer.value;
}
function onNewItemAdded(item?: CsvEntity) {
  if (!item) return;
  fileStore.data.value?.body?.push(item);
}
</script>
