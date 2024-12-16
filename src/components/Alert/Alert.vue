<template>
    <transition name="alert-slide">
        <div class="z-alert" :class="{
            [`z-alert--${type}`]: type,
            'is-dark': effect === 'dark',
            'is-light': effect === 'light',
            'is-center': center
        }" v-show="visable">

            <Icon v-if="showIcon && showIconType" :icon="showIconType" class="z-alert__icon" />
            <div class="z-alert-content">
                <span class="z-alert__title">
                    <slot>{{ content }}</slot>
                </span>

                <template v-if="closable">
                    <div v-if="closeText" class="z-alert__close-btn is_customed" @click="close">
                        {{ closeText }}
                    </div>
                    <Icon v-else class="z-alert__close-btn" icon="xmark" v-if="closable" @click="close" />
                </template>
            </div>
        </div>
    </transition>
</template>

<script lang="ts" setup>
import { type AlertProps } from './types';
import Icon from '../Icon/Icon.vue';
import { computed, ref } from 'vue';
defineOptions({
    name: 'ZAlert'
})
const props = withDefaults(defineProps<AlertProps>(), {
    closable: true,
    effect: 'light'
})
const emit = defineEmits(['close'])
const visable = ref(true)
const close = () => {
    visable.value = false
    emit('close')
}
const showIconType = computed(() => {
    if (props.type === 'primary') {
        return 'cloud'
    }
    if (props.type === 'success') {
        return 'circle-check'
    }
    if (props.type === 'error') {
        return 'circle-xmark'
    }
    if (props.type === 'info') {
        return 'circle-info'
    }
    if (props.type === 'warning') {
        return 'circle-exclamation'
    }
})
</script>