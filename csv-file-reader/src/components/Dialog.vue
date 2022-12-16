<template>
  <div>
    <slot
      name="activator"
      :show="() => setShowDialog(true)"
      :close="() => setShowDialog(false)"
    />
    <v-dialog
      v-model="componentData.showDialog"
      :width="componentProperties.width"
      :class="componentProperties.class"
    >
      <slot />
    </v-dialog>
  </div>
</template>
<script setup lang="ts">
import { reactive, defineProps, withDefaults, watch, defineEmits } from "vue";
interface IDialogComponentProperties {
  modelValue?: boolean;
  width?: any;
  class?: string;
}
interface IDialogComponentData {
  showDialog?: boolean;
}
interface IDialogComponentEvents {
  (e: "update:modelValue", show: boolean): void;
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
