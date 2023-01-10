<template>
  <Dialog v-model="componentData.showDialog">
    <template v-slot:activator="{ show, close }">
      <v-btn @click.stop="show" class="mt-2">
        Add new data <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card v-if="componentData.data">
      <v-card-text>
        <v-form ref="newItemForm" v-model="componentData.valid">
          <v-select
            v-model="componentData.data.event_type"
            :items="eventTypes"
            label="EventType"
            :rules="[useFieldIsRequired('EventType')]"
          />
          <v-text-field
            v-model="componentData.data.price"
            label="Price"
            type="number"
            :rules="[useFieldIsRequired('Price')]"
          />

          <v-text-field
            v-model="componentData.data.price_feb"
            label="PriceFeb"
            type="number"
            :rules="[useFieldIsRequired('PriceFeb')]"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click.stop.prevent="onOnSaveClicked"
          :disabled="!componentData.valid"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </Dialog>
</template>
<script lang="ts" setup>
import { useFieldIsRequired } from "@composables/useRules";
import Dialog from "@/components/Dialog.vue";
import {
  ref,
  computed,
  defineProps,
  reactive,
  withDefaults,
  defineEmits,
  onMounted,
} from "vue";
import {
  CsvEntity,
  FileUploaderModelValue,
  Events,
  EventTypesEnum,
} from "@/types";

interface INewItemComponentProperties {
  file?: FileUploaderModelValue;
  existingIds?: string[];
}
interface INewItemComponentData {
  data?: CsvEntity;
  showDialog: boolean;
  valid: boolean;
  isMounted: boolean;
}
interface INewItemComponentEvents {
  (e: Events.onSaveClicked, item?: CsvEntity): void;
}
const componentProperties = withDefaults(
  defineProps<INewItemComponentProperties>(),
  {
    existingIds: () => [],
  }
);
const componentData = reactive<INewItemComponentData>({
  data: {} as CsvEntity,
  showDialog: false,
  valid: false,
  isMounted: false,
});
const newItemForm = ref();
const emits = defineEmits<INewItemComponentEvents>();
const eventTypes = computed(() => Object.values(EventTypesEnum));
function clearData() {
  componentData.data = {} as CsvEntity;
}
function onOnSaveClicked() {
  if (!componentData.data) return;
  validateForm();
  if (!componentData.valid) return;
  emits(Events.onSaveClicked, componentData.data);
  clearData();
  closeDialog();
}

function closeDialog() {
  componentData.showDialog = false;
}
function validateForm() {
  if (!componentData.isMounted) return;
  newItemForm.value.validate();
}
onMounted(() => {
  componentData.isMounted = true;
});
</script>
