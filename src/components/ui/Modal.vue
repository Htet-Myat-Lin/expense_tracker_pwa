<script setup lang="ts">
withDefaults(
    defineProps<{
        isOpen: boolean
        title?: string
        maxWidth?: string
    }>(),
    {
        title: '',
        maxWidth: 'max-w-lg',
    }
)

const emit = defineEmits<{ close: [] }>()
</script>

<template>
    <Teleport to="body">
        <Transition name="modal-fade">
            <div
                v-if="isOpen"
                class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 px-4 py-6 backdrop-blur-[2px]"
                @click.self="emit('close')"
            >
                <div
                    role="dialog"
                    aria-modal="true"
                    :class="['w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_26px_80px_rgba(15,23,42,0.24)]', maxWidth]"
                >
                    <div class="flex items-start justify-between gap-3 border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6">
                        <div class="space-y-1">
                            <h2 v-if="title" class="text-lg font-semibold text-slate-900">
                                {{ title }}
                            </h2>
                            <slot name="subtitle" />
                        </div>

                        <button
                            type="button"
                            aria-label="Close modal"
                            class="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-xl leading-none text-slate-500 transition hover:border-slate-300 hover:text-slate-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                            @click="emit('close')"
                        >
                            ×
                        </button>
                    </div>

                    <div class="p-5 sm:p-6">
                        <slot />
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active .w-full,
.modal-fade-leave-active .w-full {
    transition: transform 0.2s ease, opacity 0.2s ease;
}

.modal-fade-enter-from .w-full,
.modal-fade-leave-to .w-full {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
}
</style>