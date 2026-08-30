<script setup lang="ts">
const props = defineProps<{ balance: number }>()

</script>

<template>
  <section class="relative overflow-hidden rounded-[30px] bg-linear-to-br from-indigo-700 via-indigo-700 to-indigo-800 px-5 pb-5 pt-6 text-white shadow-[0_24px_48px_rgba(67,56,202,0.28)] sm:px-6">
    <div class="absolute -right-10 -top-8 h-28 w-28 rounded-full bg-indigo-300/35 blur-[2px]" />
    <div class="absolute -right-8 bottom-14 h-24 w-24 rounded-full bg-amber-300/90" />

    <div class="relative z-10 flex items-start justify-between">
      <div>
        <p class="text-2xl font-medium text-indigo-50/90">Total Balance</p>
        <h2 class="mt-3 text-4xl font-bold tracking-[-0.04em] text-white sm:text-[2.6rem]">
          {{ props.balance }}
        </h2>
      </div>

      <button
        type="button"
        class="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-indigo-700 shadow-sm transition hover:bg-indigo-50"
      >
        <span>My Balances</span>
        <span class="flex h-7 w-7 items-center justify-center rounded-full bg-amber-300 text-base font-bold text-indigo-900">↓</span>
      </button>
    </div>
  </section>
</template>