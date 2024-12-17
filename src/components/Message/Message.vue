<template>
    <Transition :name="transitionName" @after-leave="destroyComponent" @enter="updateHeight">
        <div class="z-message" :class="{ [`z-message--${type}`]: type, 'is-close': showClose }" role="alert"
            v-show="visible" ref="messageRef" :style="cssStyle" @mouseenter="clearTimer" @mouseleave="startTimer">
            <div class="z-message__content">
                <slot>
                    <RenderVnode :v-node="message" v-if="message" />
                </slot>
            </div>
            <div class="z-message__close" v-if="showClose">
                <Icon @click.stop="visible = false" icon="xmark" />
            </div>
        </div>
    </Transition>
</template>
<script lang="ts" setup>
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { computed, nextTick, onMounted, ref, watch } from 'vue';
import { getLastBottomOffset, getLastInstance } from './method';
import useEventListener from '@/hooks/useEventlistener';

defineOptions({
    name: 'ZMessage'
})
const props = withDefaults(defineProps<MessageProps>(), {
    type: 'info',
    duration: 3000,
    offset: 20,
    transitionName: 'fade-up'
})
const visible = ref(false)
const messageRef = ref<HTMLElement>()
// 计算偏移高度
// 当前实例的高度
const height = ref(0)
// 上一个实例最下面的坐标数字，第一个是 0
const lastOffset = computed(() => getLastBottomOffset(props.id))
// 当前实例应该使用的top值
const topOffset = computed(() => props.offset + lastOffset.value)
// 为下一个实例预留 offset 也就是当前实例的bottom值
const bottomOffset = computed(() => height.value + topOffset.value)
const cssStyle = computed(() => ({
    top: topOffset.value + 'px',
    zIndex: props.zIndex,
}))
let timer: any
const startTimer = () => {
    if (props.duration === 0) return
    timer = setTimeout(() => {
        visible.value = false
    }, props.duration)
}
function clearTimer() {
    clearTimeout(timer)
}
onMounted(async () => {
    visible.value = true
    startTimer()
    // await nextTick()
    // height.value = messageRef.value!.getBoundingClientRect().height
})
function keydown(e: Event) {
    const event = e as KeyboardEvent
    if (event.code === 'Escape') {
        visible.value = false
    }
}
useEventListener(document, 'keydown', keydown)
// watch(visible, (newVal) => {
//     if (!newVal) {
//         props.onDestory()
//     }
// })
function destroyComponent() {
    props.onDestory()
}
function updateHeight() {
    height.value = messageRef.value!.getBoundingClientRect().height
}
defineExpose({
    bottomOffset,
    visible
})
</script>
