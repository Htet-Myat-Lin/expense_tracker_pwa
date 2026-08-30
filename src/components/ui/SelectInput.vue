<script setup lang="ts">
type SelectData = Record<"value" | "label", string>

interface Props {
    selectData: SelectData[];
    placeholder: string;
    id: string;
}

const props = defineProps<Props>()
const value = defineModel<string>()
</script>

<template>
    <div class="relative">
        <select
            :id="props.id"
            v-model="value"
            class="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 pr-10 text-sm text-slate-800 transition-all duration-200 focus:border-indigo-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
        >
            <option value="" disabled selected>{{ props.placeholder }}</option>
            <option v-for="(data, index) in props.selectData" :value="data.value" :key="index">
                {{ data.label }}
            </option>
        </select>
    </div>
</template>