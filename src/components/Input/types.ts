export interface InputProps {
    type: string;
    size?: 'large' | 'small';
    modelValue: string;
    disabled?: boolean;
    clearable?: boolean;
    showPassword?: boolean;
    placeholder?: string;
    readonly?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    form?: string;
}

export interface InputEmits {
    (e: 'update:modelValue', value: string): void;
    (e: 'input', value: string): void;
    (e: 'change', value: string): void;
    (e: 'focus', value: FocusEvent): void;
    (e: 'blur', value: FocusEvent): void;
    (e: 'clear'): void;
}