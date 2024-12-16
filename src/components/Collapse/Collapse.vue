<template>
    <div class="z-collapse">
        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import { provide, ref, watch } from "vue";
import {
    collapseContentKey,
    type CollapseEmits,
    type CollapseProps,
    type NameType,
} from "./types";

defineOptions({
    name: "ZCollapse",
});

const pros = defineProps<CollapseProps>();
const emits = defineEmits<CollapseEmits>();

const activeNames = ref<NameType[]>(pros.modelValue);
watch(
    () => pros.modelValue,
    () => {
        activeNames.value = pros.modelValue;
    }
);
if (pros.accordion && activeNames.value.length > 1) {
    console.log("accordion model should only have one active item");
}

const handlItemClick = (item: NameType) => {
    if (pros.accordion) {
        activeNames.value = [activeNames.value[0] === item ? " " : item];
    } else {
        const index = activeNames.value.indexOf(item);
        if (index > -1) {
            activeNames.value.splice(index, 1);
        } else {
            activeNames.value.push(item);
        }
    }
    emits("update:modelValue", activeNames.value);
};
provide(collapseContentKey, {
    activeNames,
    handlItemClick,
});
</script>
