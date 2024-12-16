import type { Ref, InjectionKey } from "vue";
export type NameType = string | number

export interface CollapseProps {
    modelValue: NameType[];
    accordion?: boolean
}

export interface CollapsItemProps {
    name: NameType;
    title?: string;
    disabled?: boolean
}

export interface CollapseContent {
    activeNames: Ref<NameType[]>;
    handlItemClick: (item: NameType) => void
}

export interface CollapseEmits {
    (e: 'update:modelValue', value: NameType[]): void;
}

export const collapseContentKey: InjectionKey<CollapseContent> = Symbol('collapseContentKey')