import { type VNode } from "vue";
export interface SelectOption {
    label: string;
    value: string | number;
    disabled?: boolean;
}

export interface SelectProps {
    modelValue: string | number;
    options: SelectOption[];
    placeholder: string;
    disabled?: boolean;
    clearable?: boolean;
    renderLabel?: RenderLabelFunc;
    filterable?: boolean;
    filterMethod?: CustomeFilterFunc;
}

export interface SelectStates {
    inputValue: string;
    selectedOption: null | SelectOption;
    mouseHover: boolean
}

export type RenderLabelFunc = (option: SelectOption) => VNode
export type CustomeFilterFunc = (value: string) => SelectOption[]

export interface SelectEmits {
    (e: 'update:modelValue', value: string | number): void;
    (e: 'change', value: string | number): void;
    (e: 'visibleChange', value: boolean): void;
    (e: 'clear'): void;
}
