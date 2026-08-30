<script setup lang="ts">
import { useAppStore } from '../store/app.store';
import type { Transaction } from '../type'
import Modal from "../components/ui/Modal.vue"
import Button from "../components/ui/Button.vue"
import { ref } from 'vue';

const appStore = useAppStore()

const props = defineProps<{ transaction: Transaction }>()
const emit = defineEmits<{ delete: [id: string] }>()

const isDeleteModalOpen = ref(false)

const closeDeleteModal= () => isDeleteModalOpen.value = false

const formatDate = (value: string | Date) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  }).format(new Date(value))

const isIncome = props.transaction.type === 'INCOME'
const badgeClasses = isIncome
  ? 'bg-emerald-100 text-emerald-700'
  : 'bg-rose-100 text-rose-700'

const icon = isIncome ? '↑' : '↓'
</script>

<template>
  <article class="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_20px_rgba(15,23,42,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_24px_rgba(79,70,229,0.08)]">
    <div class="flex min-w-0 flex-1 items-center gap-3">
      <div
        class="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold"
        :class="isIncome ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'"
      >
        {{ icon }}
      </div>

      <div class="min-w-0 flex-1">
        <h3 class="truncate text-base font-semibold text-slate-800">{{ transaction.name }}</h3>
        <div class="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
          <span class="rounded-full px-2 py-0.5" :class="badgeClasses">
            {{ transaction.type }}
          </span>
          <span>{{ transaction.category?.name || 'General' }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-2 text-right">
      <div>
        <span class="block text-[10px] text-slate-500">{{ formatDate(transaction.createdAt) }}</span>
        <p class="font-semibold" :class="isIncome ? 'text-emerald-600' : 'text-rose-600'">
          {{ Math.abs(transaction.amount) }}
        </p>
      </div>

      <button
        v-if="appStore.view === 'List'"
        type="button"
        @click.stop="isDeleteModalOpen = true"
        class="flex h-8 w-8 items-center justify-center rounded-full border border-rose-200 bg-rose-50 text-xs font-bold text-rose-600 transition hover:bg-rose-100"
        aria-label="Delete transaction"
      >
        ×
      </button>   
    </div>
  </article>

  <Modal
    :is-open="isDeleteModalOpen"
    @close="closeDeleteModal"
    title="Are you sure to delete?"
    max-width="max-w-xs"
  >
    <div class="flex items-center justify-between gap-5">
      <Button 
          class="w-1/2"
          @click.stop="emit('delete', transaction.id)"
      >
          Yes
      </Button>
      <Button 
          variant="danger" 
          class="w-1/2"
          @click="closeDeleteModal"
      >
          No
      </Button>
    </div>
  </Modal>
</template>