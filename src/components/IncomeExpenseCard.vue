<script setup lang="ts">
const props = defineProps<{ income: number; expense: number }>()

</script>

<template>
  <div class="mt-4 grid grid-cols-2 overflow-hidden rounded-[26px] shadow-[0_18px_30px_rgba(79,70,229,0.14)]">
    <div class="flex items-center justify-between bg-linear-to-br from-indigo-400 to-indigo-500 px-4 py-5 text-white sm:px-5">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-lg font-bold">↑</div>
        <div>
          <p class="text-sm text-indigo-50/85">Income</p>
          <p class="mt-1 font-bold tracking-[-0.04em]">{{ props.income }}</p>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between border-l border-indigo-200 bg-linear-to-br from-indigo-50 to-violet-100 px-4 py-5 text-indigo-900 sm:px-5">
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-full bg-amber-200 text-lg font-bold text-indigo-900">↓</div>
        <div>
          <p class="text-sm text-indigo-700/80">Expenses</p>
          <p class="mt-1 font-bold tracking-[-0.04em]">{{ props.expense }}</p>
        </div>
      </div>
    </div>
  </div>
</template>