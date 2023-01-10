import { defineStore } from "pinia";
import { ProcessedCsvFile } from "@/types";
import { useTypedStorage } from "@composables/useTypedStorage";
interface IFileStoreData {
  value?: ProcessedCsvFile;
}
const defaultData: IFileStoreData = {
  value: {
    body: [],
    headers: [],
  } as ProcessedCsvFile,
};
export const useFileStore = defineStore("FileStore", {
  state: () => ({
    data: useTypedStorage<IFileStoreData>("file", defaultData),
  }),
  actions: {
    set(value: ProcessedCsvFile) {
      this.data.value = value;
    },
    clearData() {
      this.data.value = this.createEmptyProcessedCdFile();
    },
    createEmptyProcessedCdFile(): ProcessedCsvFile {
      return {
        body: [],
        headers: [],
      };
    },
  },
});
