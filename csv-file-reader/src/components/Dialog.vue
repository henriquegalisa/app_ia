<template>
  <div>
    <slot
      name="activator"
      :show="() => setShowDialog(true)"
      :close="() => setShowDialog(false)"
    />
    <v-dialog
      v-model="componentData.showDialog"
      :class="componentProperties.class"
      :fullscreen="display.smAndDown.value"
    >
      <v-card v-if="display.smAndDown.value">
        <v-toolbar dark color="transparent">
          <v-spacer />
          <v-btn icon dark @click="setShowDialog(false)">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <slot />
        </v-card-text>
      </v-card>
      <slot v-if="display.mdAndUp.value" />
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineProps, withDefaults, watch, defineEmits } from "vue";
import { useVuetifyDisplay } from "@composables/useVuetifyDisplay";
interface IDialogComponentProperties {
  modelValue?: boolean;
  width?: any;
  class?: string;
}
interface IDialogComponentData {
  showDialog?: boolean;
}
interface IDialogComponentEvents {
  (e: "update:modelValue", show?: boolean): void;
}
const componentProperties = withDefaults(
  defineProps<IDialogComponentProperties>(),
  {
    modelValue: false,
    width: "50vw",
  }
);
const componentData = reactive<IDialogComponentData>({
  showDialog: componentProperties.modelValue,
});
const emits = defineEmits<IDialogComponentEvents>();
const display = useVuetifyDisplay();
watch(
  () => componentProperties.modelValue,
  (value) => {
    componentData.showDialog = value;
  },
  {
    immediate: true,
  }
);
watch(
  () => componentData.showDialog,
  (value) => {
    emits("update:modelValue", value);
  },
  {
    immediate: true,
  }
);
function setShowDialog(value: boolean) {
  componentData.showDialog = value;
}
</script>
