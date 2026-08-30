<script setup lang="ts">
import Navbar from '../components/Navbar.vue';
import { onMounted, ref } from 'vue';
import { type Transaction, type DashboardReport } from '../type';
import { TransactionService } from '../api/service/transaction.service';
import BalanceCard from '../components/BalanceCard.vue';
import IncomeExpenseCard from '../components/IncomeExpenseCard.vue';
import TransactionCard from '../components/TransactionCard.vue';
import { useAppStore } from '../store/app.store.ts';

const appStore = useAppStore()

const dashboardReport = ref<DashboardReport>({
    balance: 0,
    income: 0,
    expense: 0
})

const transactions = ref<Transaction[]>([])

onMounted(async () => {
    try {
        const reportRes = await TransactionService.getReport()
        if (reportRes.success) dashboardReport.value = reportRes.content

        const transactionRes = await TransactionService.getAll()
        if (transactionRes.success) transactions.value = transactionRes.content.content
    } catch {}
})
</script>

<template>
    <Navbar />
    <main class="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 lg:px-8 space-y-8">
        <div class="mx-auto max-w-xl">
            <BalanceCard :balance="dashboardReport.balance" />
            <IncomeExpenseCard :income="dashboardReport.income" :expense="dashboardReport.expense" />
        </div>

        <section class="mx-auto max-w-xl">
            <div class="mb-4 flex items-center justify-between">
                <h2 class="text-xl font-semibold text-slate-800">Latest Transactions</h2>
                <span @click="appStore.setView('List')" class="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline">See All</span>
            </div>

            <div v-if="transactions.length" class="space-y-3">
                <TransactionCard v-for="transaction in transactions.slice(0, 4)" :key="transaction.id" :transaction="transaction" />
            </div>

            <div v-else class="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                No transactions yet.
            </div>
        </section>
    </main>
</template>