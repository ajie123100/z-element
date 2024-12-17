import type { ComponentInternalInstance, VNode } from "vue";

export interface MessageProps {
    message?: string | VNode;
    duration?: number;
    showClose?: boolean;
    type?: 'success' | 'warning' | 'danger' | 'info';
    onDestory: () => void;
    id: string;
    zIndex: number;
    offset?: number;
    transitionName?: string;
}

export interface MessageContext {
    id: string;
    vnode: VNode;
    vm: ComponentInternalInstance;
    props: MessageProps;
    destory: () => void;
}

export type createMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex' > // 忽略onDestory id zIndex 