<template>
    <div class="z-select" :class="{
        'is-disabled': disabled
    }" @click="toggleDropdown" @mouseenter="states.mouseHover = true" @mouseleave="states.mouseHover = false">
        <Tooltip placement="bottom-start" manual ref="tooltipRef" :popper-options="popperOptions"
            @click-outside="controlDropdown(false)">
            <Input ref="inputRef" v-model="states.inputValue" :disabled="disabled" :placeholder="filteredPlaceholder"
                :readonly="!filterable || !isDropdownShow" @input="onFilter">
            <template #suffix>
                <Icon icon="circle-xmark" v-if="showClearIcon" class="z-input__clear" @mousedown.prevent="NOOP"
                    @click.stop="onClick" />
                <Icon v-else icon="angle-down" class="header-angle" :class="{ 'is-active': isDropdownShow }" />
            </template>
            </Input>
            <template #content>
                <ul class="z-select__menu">
                    <template v-for="(item, index) in filteredoptions" :key="index">
                        <li class="z-select__menu-item" :class="{
                            'is-disabled': item.disabled,
                            'is-selected': states.selectedOption?.value === item.value
                        }" :id="`select-item-${item.value}`" @click.stop="itemSelect(item)">
                            <RenderVnode :v-node="renderLabel ? renderLabel(item) : item.label" />
                        </li>
                    </template>
                </ul>
            </template>
        </Tooltip>
    </div>
</template>
<script lang="ts" setup>
import type { SelectEmits, SelectOption, SelectProps, SelectStates } from './tpyes';
import Tooltip from '../Tooltip/Tooltip.vue';
import Input from '../Input/Input.vue';
import Icon from '../Icon/Icon.vue';
import RenderVnode from '../Common/RenderVnode';
import { computed, reactive, ref, watch } from 'vue';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../Input/types';
import { isFunction } from 'lodash-es';

defineOptions({
    name: 'ZSelect'
})
const findOption = (value: string | number) => {
    const option = props.options.find(item => item.value === value)
    return option ? option : null
}
const props = withDefaults(defineProps<SelectProps>(), {})
const emit = defineEmits<SelectEmits>()
const initOption = findOption(props.modelValue)
const tooltipRef = ref<TooltipInstance | null>(null)
const inputRef = ref<InputInstance | null>(null)
const states = reactive<SelectStates>({
    inputValue: initOption ? initOption.label : '',
    selectedOption: initOption,
    mouseHover: false
})
const isDropdownShow = ref(false)
const popperOptions: any = {
    modifiers: [
        {
            name: 'offset',
            options: {
                offset: [0, 9],
            },
        },
        {
            name: "sameWidth",
            enabled: true,
            fn: ({ state }: { state: any }) => {
                state.styles.popper.width = `${state.rects.reference.width}px`;
            },
            phase: "beforeWrite",
            requires: ["computeStyles"],
        }
    ],
}
const filteredoptions = ref<SelectOption[]>(props.options)
watch(() => props.options, (newValue) => {
    filteredoptions.value = newValue
})
const generateFilterOptions = (searchValue: string) => {
    if (!props.filterable) return
    if (props.filterMethod && isFunction(props.filterMethod)) {
        filteredoptions.value = props.filterMethod(searchValue)
    } else {
        filteredoptions.value = props.options.filter(option => option.label.includes(searchValue))
    }
}
const onFilter = () => {
    generateFilterOptions(states.inputValue)
}
const filteredPlaceholder = computed(() => {
    return (props.filterable && states.selectedOption && isDropdownShow.value) ? states.selectedOption.label : props.placeholder
})
const controlDropdown = (show: boolean) => {
    if (show) {
        if (props.filterable && states.inputValue) {
            states.inputValue = ''
        }
        if (props.filterable) {
            generateFilterOptions(states.inputValue)
        }
        tooltipRef.value!.show()
    } else {
        tooltipRef.value!.hide()
        if (props.filterable) {
            states.inputValue = states.selectedOption ? states.selectedOption.label : ''
        }
    }
    isDropdownShow.value = show
    emit('visibleChange', show)
}
const showClearIcon = computed(() => {
    return props.clearable &&
        states.mouseHover &&
        states.selectedOption &&
        states.inputValue.trim() !== ''
})
const onClick = () => {
    states.selectedOption = null
    states.inputValue = ''
    emit('clear')
    emit('change', '')
    emit('update:modelValue', '')
}
const NOOP = () => { }
const toggleDropdown = () => {
    if (props.disabled) return
    if (isDropdownShow.value) {
        controlDropdown(false)
    } else {
        controlDropdown(true)
    }
}
const itemSelect = (option: SelectOption) => {
    if (option.disabled) return
    states.inputValue = option.label
    states.selectedOption = option
    emit('change', option.value)
    emit('update:modelValue', option.value)
    controlDropdown(false)
    inputRef.value?.ref.focus()
}
</script>