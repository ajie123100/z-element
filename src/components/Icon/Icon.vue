<template>
    <i class="z-icon" :class="{
        [`z-icon--${type}`]: type
    }" :style="customStyles" v-bind="$attrs">
        <font-awesome-icon v-bind=filterProps />
    </i>
</template>

<script lang="ts" setup>
import { omit } from "lodash-es";
import type { IconProps } from "./types";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { computed } from "vue";
defineOptions({
    name: 'ZIcon',
    inheritAttrs: false
})
const props = defineProps<IconProps>()
const filterProps = computed(() => omit(props, ['type', 'color']))
const customStyles = computed(() => {
    return props.color ? { color: props.color } : {}
})
</script>