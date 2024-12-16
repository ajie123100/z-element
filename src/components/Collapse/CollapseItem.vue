<template>
  <div class="z-collapse-item" :class="{ 'is-disabled': disabled }">
    <div class="z-collapse-item__header" :id="`item-header-${name}`" @click="handleClick" :class="{
      'is-disabled': disabled,
      'is-active': isActive,
    }">
      <slot name="title">
        {{ title }}
      </slot>
      <Icon icon="angle-right" class="header-angle" />
    </div>
    <Transition name="slide" v-on="transitionEvents">
      <div class="z-collapse-item__wrapper" v-show="isActive">
        <div class="z-collapse-item__content" :id="`item-content-${name}`">
          <slot></slot>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, inject } from "vue";
import { collapseContentKey, type CollapsItemProps } from "./types";
import Icon from "../Icon/Icon.vue";
defineOptions({
  name: "ZCollapseItem",
});
const props = defineProps<CollapsItemProps>();

const collapseContent = inject(collapseContentKey);
const isActive = computed(() => {
  return collapseContent?.activeNames.value.includes(props.name);
});
const handleClick = () => {
  if (props.disabled) return;
  collapseContent?.handlItemClick(props.name);
};

const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter: (el) => {
    el.style.height = "0px";
    el.style.overflow = "hidden";
  },
  enter: (el) => {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter: (el) => {
    el.style.height = "";
    el.style.overflow = "";
  },
  beforeLeave: (el) => {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },
  leave: (el) => {
    el.style.height = "0px";
  },
  afterLeave: (el) => {
    el.style.height = "";
    el.style.overflow = "";
  },
};
</script>

<style scoped></style>
