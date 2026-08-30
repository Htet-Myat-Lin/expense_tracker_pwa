<template>
    <div class="w-full">
        <input
            class="w-full rounded-xl border bg-slate-50 px-3.5 py-3 text-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
            :class="props.errorMessage ? 'border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-100' : 'border-slate-200'"
            :type="props.type"
            :id="props.id"
            :placeholder="props.placeholder"
            v-model="value"
        >
        <p v-if="props.errorMessage" class="mt-2 text-xs text-red-500">
            {{ props.errorMessage }}
        </p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    type?: "text" | "email" | "password" | "number";
    id: string;
    placeholder: string;
    errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
    type: "text",
})

const value = defineModel()
</script>