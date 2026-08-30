<template>
    <h2 
        class="text-3xl font-bold text-slate-900 mb-4"
    >
        {{ props.header }}
    </h2>
</template>

<script setup lang="ts">
const props = defineProps<{ header: string }>()
</script>