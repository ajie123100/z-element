<template>
    <div class="z-dropdown">
        <Tooltip :trigger="trigger" :placement="placement" :popper-options="popperOptions" :open-delay="openDelay"
            :close-delay="closeDelay" @visible-change="visibleChange" ref="tooltipRef">
            <slot></slot>
            <template #content>
                <ul class="z-dropdown__menu">
                    <template v-for="item in menuOptions" :key="item.key">
                        <li v-if="item.divided" role="separator" class="divided-placeholder"></li>
                        <li class="z-dropdown__item"
                            :class="{ 'is-disabled': item.disabeled, 'is-divided': item.divided }"
                            :id="`dropdown-item-${item.key}`" @click="itemClick(item)">
                            <RenderVnode :v-node="item.label" />
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>

<script lang="ts" setup>
import type { DropdownEmits, DropdownInstance, DropdownProps, MenuOption } from './types';
import Tooltip from '../Tooltip/Tooltip.vue';
import { ref, type Ref } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';
import RenderVnode from '../Common/RenderVnode';
defineOptions({
    name: 'ZDropdown'
})
const props = withDefaults(defineProps<DropdownProps>(), {
    hideAfterClick: true
})
const emit = defineEmits<DropdownEmits>()
const tooltipRef = ref<TooltipInstance | null>(null)
const visibleChange = (e: boolean) => {
    emit('visible-change', e)
}
const itemClick = (e: MenuOption) => {
    if (e.disabeled) return
    emit('select', e)
    if (props.hideAfterClick) {
        tooltipRef.value?.hide()
    }
}
defineExpose<DropdownInstance>({
    show: () => tooltipRef.value?.show(),
    hide: () => tooltipRef.value?.hide()
})
</script>