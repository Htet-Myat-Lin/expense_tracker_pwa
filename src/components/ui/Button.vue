<template>
    <button
        :type="props.type"
        :disabled="props.disabled"
        class="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-4"
        :class="[
            variantClasses[props.variant],
            props.disabled ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-0.5 active:translate-y-0'
        ]"
    >
        <slot />
    </button>
</template>

<script setup lang="ts">
interface Props {
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    type: "button",
    variant: "primary",
    disabled: false,
})

const variantClasses: Record<string, string> = {
    primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-500 focus:ring-indigo-200",
    secondary: "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 focus:ring-slate-200",
    danger: "border border-red-200 bg-red-500 text-white hover:bg-red-600 focus:ring-red-200"
}
</script>
