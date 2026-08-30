<template>
    <label 
        class="block text-gray-700 mb-2" 
        :for="props.for"
    >
        {{ props.label }}
    </label>
</template>

<script setup lang="ts">
interface Props {
    for: string;
    label: string;
}
const props = defineProps<Props>()
</script>