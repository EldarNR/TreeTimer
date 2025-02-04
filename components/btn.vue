<template>
    <button :class="buttonClass" :disabled="disabled" @click="handleClick">
        <slot>Button</slot>
    </button>
</template>

<script setup lang="ts">
import { computed, defineProps, defineEmits } from "vue";

// Определение свойств (props)
const props = defineProps<{
    variant?: "primary" | "secondary" | "danger";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
}>();

const emits = defineEmits<{
    (e: "click", event: MouseEvent): void;
}>();

// Значения по умолчанию
const variant = props.variant ?? "primary";
const size = props.size ?? "md";
const disabled = props.disabled ?? false;

// Классы кнопки
const buttonClass = computed(() => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded transition focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantClasses: Record<string, string> = {
        primary: "bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500",
        secondary: "bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500",
        danger: "bg-red-500 text-white hover:bg-red-600 focus:ring-red-500",
    };
    const sizeClasses: Record<string, string> = {
        sm: "text-sm px-3 py-1",
        md: "text-base px-4 py-2",
        lg: "text-lg px-6 py-3",
    };
    const disabledClasses = "opacity-50 cursor-not-allowed";

    return [
        baseClasses,
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        disabled && disabledClasses,
    ]
        .filter(Boolean)
        .join(" ");
});

// Обработчик клика
const handleClick = (event: MouseEvent) => {
    if (!disabled) {
        emits("click", event);
    }
};
</script>
