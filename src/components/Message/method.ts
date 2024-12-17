import { h, reactive, render, shallowReactive } from "vue";
import type { MessageContext, MessageProps, createMessageProps } from "./types";
import MessageConstructor from './Message.vue'
import useZIndex from "@/hooks/useZIndex";
let seed = 1
const instances: MessageContext[] = shallowReactive([])
export const createMessage = (props: createMessageProps) => {
    const { nextZIndex } = useZIndex()
    const id = `message_${seed++}`
    const container = document.createElement('div')
    const destory = () => {
        const idx = instances.findIndex(item => item.id === id)
        if (idx === -1) return
        instances.splice(idx, 1)
        render(null, container)
    }
    const manualDestroy = () => {
        const instance = instances.find(item => item.id === id)
        if (instance) {
            instance.vm.exposed!.visible.value = false
        }
    }
    const newProps = {
        ...props,
        id,
        zIndex: nextZIndex().value,
        onDestory: destory
    }
    const vnode = h(MessageConstructor, newProps)
    render(vnode, container)

    document.body.appendChild(container.firstElementChild!)
    const vm = vnode.component!
    const instance = {
        id,
        vnode,
        vm,
        props: newProps,
        destory: manualDestroy
    }
    instances.push(instance)
    return instance
}

export const getLastInstance = () => {
    return instances[instances.length - 1]
}

export const getLastBottomOffset = (id: string) => {
    const idx = instances.findIndex(item => item.id === id)
    if (idx <= 0) {
        return 0
    } else {
        const prev = instances[idx - 1]
        return prev.vm.exposed!.bottomOffset.value
    }
}