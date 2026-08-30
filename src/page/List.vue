<template>
    <Navbar />
    <main class="px-4 py-5 sm:px-6">
        <div class="mx-auto max-w-xl space-y-5">
            <button
                type="button"
                class="rounded-full border border-indigo-200 bg-white px-3 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-100"
                @click="appStore.setView('Dashboard')"
            >
                Back
            </button>

            <div class="space-y-4">
                <div class="mb-4 flex items-center justify-between gap-3">
                    <h2 class="text-xl font-semibold text-slate-800">Transactions</h2>
                    <span @click="openAddModal" class="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-500 hover:underline">Add</span>
                </div>

                <div class="mb-4 grid grid-cols-3 text-slate-700">
                    <button 
                        @click="handleSearch('ALL')"
                        class="text-sm py-1.5 rounded-l border-l border-y border-slate-200 hover:bg-indigo-600 hover:text-slate-50 transition-all duration-200"
                        :class="{ 'bg-indigo-600 text-slate-50': selectedType === 'ALL' }"
                    >
                        ALL
                    </button>
                    <button 
                        @click="handleSearch('INCOME')" 
                        class="text-sm py-1.5 border border-slate-200 hover:bg-indigo-600 hover:text-slate-50 transition-all duration-200"
                        :class="{ 'bg-indigo-600 text-slate-50': selectedType === 'INCOME' }"
                    >
                        INCOME
                    </button>
                    <button 
                        @click="handleSearch('EXPENSE')" 
                        class="text-sm py-1.5 rounded-r border-r border-y border-slate-200 hover:bg-indigo-600 hover:text-slate-50 transition-all duration-200"
                        :class="{ 'bg-indigo-600 text-slate-50': selectedType === 'EXPENSE' }"
                    >
                        EXPENSE
                    </button>
                </div>

                <div v-if="transactions.length" class="space-y-3">
                    <div v-for="transaction in transactions" :key="transaction.id" @click="openEditModal(transaction)" class="cursor-pointer">
                        <TransactionCard :transaction="transaction" @delete="handleDeleteTransaction" />
                    </div>
                </div>

                <div v-else class="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center text-sm text-slate-500">
                    No transactions yet.
                </div>

                <div v-if="totalPages > 1" class="flex items-center justify-between pt-2">
                    <button
                        type="button"
                        :disabled="currentPage === 1"
                        class="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40"
                        @click="currentPage = Math.max(currentPage - 1, 1)"
                    >
                        Previous
                    </button>

                    <span class="text-sm font-medium text-slate-600">
                        Page {{ currentPage }} of {{ totalPages }}
                    </span>

                    <button
                        type="button"
                        :disabled="currentPage === totalPages"
                        class="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition disabled:cursor-not-allowed disabled:opacity-40"
                        @click="currentPage = Math.min(currentPage + 1, totalPages)"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    </main>

    <Modal
        :title="modelState.mode === 'add' ? 'Add Transaction' : 'Edit Transaction'"
        max-width="max-w-sm"
        :is-open="modelState.isOpen"
        @close="closeModal"
    >
        <form class="space-y-4" @submit.prevent="saveTransaction">
            <div class="space-y-2">
                <Label for="transaction-name" label="Transaction Name" />
                <TextInput id="transaction-name" v-model="form.name" placeholder="e.g. Buying Coffee" />
            </div>

            <div class="space-y-2">
                <Label for="transaction-type" label="Type" />
                <SelectInput
                    id="transaction-type"
                    v-model="form.type"
                    :select-data="[
                        { value: 'EXPENSE', label: 'Expense' },
                        { value: 'INCOME', label: 'Income' }
                    ]"
                    placeholder="Select type"
                />
            </div>

            <div class="space-y-2">
                <Label for="transaction-amount" label="Amount" />
                <TextInput id="transaction-amount" v-model="form.amount" type="number" placeholder="10000" />
            </div>

            <div class="space-y-2">
                <Label for="transaction-category" label="Category" />
                <SelectInput
                    id="transaction-category"
                    v-model="form.categoryId"
                    :select-data="filteredCategories.map(category => ({ value: category.id, label: category.name }))"
                    placeholder="Select category"
                />
            </div>

            <div class="flex items-center justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" @click="closeModal">Cancel</Button>
                <Button type="submit">{{ modelState.mode === 'add' ? 'Save' : 'Update' }}</Button>
            </div>
        </form>
    </Modal>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import Navbar from "../components/Navbar.vue"
import type { Category, Transaction } from "../type/index.ts"
import { TransactionService } from "../api/service/transaction.service.ts"
import TransactionCard from "../components/TransactionCard.vue"
import Modal from "../components/ui/Modal.vue"
import { useAppStore } from "../store/app.store.ts"
import { useToast } from "vue-toastification"
import TextInput from "../components/ui/TextInput.vue"
import Label from "../components/ui/Label.vue"
import SelectInput from "../components/ui/SelectInput.vue"
import Button from "../components/ui/Button.vue"

interface TransactionModal {
    isOpen: boolean;
    mode: "add" | "edit";
    data: Transaction | null
}

interface TransactionForm {
    name: string;
    type: "EXPENSE" | "INCOME" | "";
    amount: string;
    categoryId: string;
}

type SearchType = 'ALL' | 'EXPENSE' | 'INCOME'

const appStore = useAppStore()
const toast = useToast()

const transactions = ref<Transaction[]>([])
const categories = ref<Category[]>([])
const selectedType = ref<SearchType>('ALL')
const currentPage = ref(1)
const totalPages = ref(0)
const form = ref<TransactionForm>({
    name: "",
    type: "",
    amount: "",
    categoryId: ""
})
const modelState = ref<TransactionModal>({
    isOpen: false,
    mode: "add",
    data: null
})

const resetForm = () => {
    form.value = {
        name: "",
        type: "",
        amount: "",
        categoryId: ""
    }
}

const handleSearch = (search: SearchType) => {
    currentPage.value = 1
    selectedType.value = search
}

const getFilters = () => {
    const filters: any = {}
    filters.page = currentPage.value - 1
    if (selectedType.value !== "ALL") filters.type = selectedType.value
    return filters
}

const fetchTransactions = async (filters: Record<string, string | number | undefined> = {}) => {
    try {
        const transactionRes = await TransactionService.getAll(filters)
        if (transactionRes.success) {
            transactions.value = transactionRes.content?.content || []
            totalPages.value = transactionRes.content?.totalPages || 0
            currentPage.value = transactionRes.content?.pageable?.pageNumber + 1 || 1
        }
    } catch {}
}

const fetchCategories = async () => {
    try {
        const categoryRes = await TransactionService.getCategories()
        categories.value = categoryRes?.success ? categoryRes.content : []
    } catch {}
}

const openAddModal = () => {
    resetForm()
    modelState.value = {
        isOpen: true,
        mode: "add",
        data: null
    }
}

const openEditModal = (data: Transaction) => {
    form.value = {
        name: data.name,
        type: data.type,
        amount: String(data.amount),
        categoryId: data.category?.id ?? ""
    }

    modelState.value = {
        isOpen: true,
        mode: "edit",
        data
    }
}

const closeModal = () => {
    modelState.value.isOpen = false
    resetForm()
}

const filteredCategories = computed(() => {
    const selectedType = form.value.type

    return categories.value.filter((category) => {
        if (category.name === 'Others') return true
        return category.type === selectedType
    })
})

const handleDeleteTransaction = async (transactionId: string) => {
    try {
        const response = await TransactionService.delete(transactionId)
        if (response.success) {
            if (totalPages.value === currentPage.value && transactions.value.length === 1) {
                currentPage.value = 1
            }
            await fetchTransactions(getFilters());
            toast.success('Transaction deleted successfully')
        }
    } catch {
        toast.error('Failed to delete transaction')
    }
}

const saveTransaction = async () => {
    const name = form.value.name.trim()
    const type = form.value.type
    const amount = Number(form.value.amount)
    const categoryId = form.value.categoryId

    if (!name || !type || !categoryId || !amount || amount <= 0) {
        toast.error("Please fill in all fields correctly.")
        return
    }

    const payload = {
        name,
        type: type as "EXPENSE" | "INCOME",
        amount,
        categoryId
    }

    try {
        const response = modelState.value.mode === "add"
            ? await TransactionService.create(payload)
            : await TransactionService.update(modelState.value.data!.id, payload)

        if (response.success) {
            await fetchTransactions(modelState.value.mode === "edit" ? { page: currentPage.value -1 } : {})
            closeModal()
            toast.success(modelState.value.mode === "add" ? "Transaction added successfully" : "Transaction updated successfully")
        }
    } catch {
        toast.error("Something went wrong while saving the transaction.")
    }
}

watch([selectedType, currentPage], async () => {
    await fetchTransactions(getFilters())
}, { immediate: true })

onMounted(async () => {
    await fetchCategories()
})
</script>