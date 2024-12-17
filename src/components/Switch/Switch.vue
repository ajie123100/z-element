<template>
    <div class="z-switch" :class="{
        [`z-switch--${size}`]: size,
        'is-disabled': disabled,
        'is-checked': checked,
    }" @click="switchValue">
        <input class="z-swtich__input" type="checkbox" role="switch" :name="name" :disabled="disabled"
            @keydown.enter="switchValue" ref="input">

        <div class="z-switch__core">
            <div class="z-switch__core-inner">
                <span v-if="activeText || inactiveText" class="z-switch__core-inner-text">
                    {{ checked ? activeText : inactiveText }}
                </span>
            </div>
            <div class="z-switch__core-action"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import type { SwitchEmits, SwitchProps } from './types';

defineOptions({
    name: 'ZSwitch'
})
const props = withDefaults(defineProps<SwitchProps>(), {
    activeValue: true,
    inactiveValue: false
})
const emit = defineEmits<SwitchEmits>()
const innerValue = ref(props.modelValue)
const input = ref<HTMLInputElement>()
const checked = computed(() => innerValue.value === props.activeValue)
const switchValue = () => {
    if (props.disabled) return
    const newValue = checked.value ? props.inactiveValue : props.activeValue
    innerValue.value = newValue
    emit('update:modelValue', newValue)
    emit('change', newValue)
}
onMounted(() => {
    input.value!.checked = checked.value
})
watch(checked, (newValue) => {
    input.value!.checked = newValue
})
watch(() => props.modelValue, (newValue) => {
    innerValue.value = newValue
})
</script>