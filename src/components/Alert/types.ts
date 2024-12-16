export interface AlertProps {
    content?: string;
    type?: 'primary' | 'warning' | 'error' | 'success' | 'info';
    effect?: 'light' | 'dark';
    closable?: boolean,
    close?: () => void,
    closeText?: string,
    showIcon?: boolean,
    center?: boolean
}