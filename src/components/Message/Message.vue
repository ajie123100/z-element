<template>
    <div class="z-message" :class="{ [`z-message-${type}`]: type, 'is-close': showClose }" role="alert"
        v-show="visible">
        <div class="z-message__content">
            <slot>
                <RenderVnode :v-node="message" v-if="message" />
            </slot>
        </div>
        <div class="z-message__close" v-if="showClose">
            <Icon @click.stop="visible = false" icon="xmark" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { onMounted, ref } from 'vue';

defineOptions({
    name: 'ZMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000
})
const visible = ref(false)
const startTimer = () => {
    if (props.duration === 0) return
    setTimeout(() => {
        visible.value = false
    }, props.duration)
}
onMounted(() => {
    visible.value = true
    startTimer()
})
</script>

<style>
.z-message {
    width: max-content;
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    border: 1px solid blue;
}
</style>