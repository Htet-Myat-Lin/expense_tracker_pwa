<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import H2Header from '../components/ui/H2Header.vue'
import Label from '../components/ui/Label.vue'
import TextInput from '../components/ui/TextInput.vue'
import { useAppStore } from '../store/app.store.ts'
import { AuthService } from '../api/service/auth.service.ts'
import axios from 'axios'
import { useToast } from 'vue-toastification'

const appStore = useAppStore()
const toast = useToast()

const email = ref('')
const password = ref('')
const errMsg = ref('')
const validationError = ref<Record<"email" | "password", string>>({ email: "", password: "" })
const isDisabled = ref(false)

const handleLogin = async () => {
    try {
        isDisabled.value = true
        const data = await AuthService.login({ email: email.value, password: password.value })
        if (data.success) {
            appStore.setUser(data.content)
            toast.success("Login Successful")
            appStore.setView("Dashboard")
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            errMsg.value = e.response?.data.message || "Internal Server Error"
            if (errMsg.value === "Validation failed") {
                validationError.value["email"] = e.response?.data.content?.email
                validationError.value["password"] = e.response?.data.content?.password
            }
        }
    } finally {
        isDisabled.value = false
    }
}
</script>

<template>
    <section class="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-white to-indigo-50 px-4 py-6">
        <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-8">
            <div class="space-y-6">
                <div class="space-y-2 text-center">
                    <H2Header header="Welcome back" />
                    <p class="text-sm text-slate-500">Sign in to continue to your account</p>
                </div>

                <form class="space-y-5" @submit.prevent="handleLogin">
                    <div v-if="errMsg && errMsg !== 'Validation failed'" class="bg-red-100 rounded p-2">
                        <p class="text-sm text-red-500">{{ errMsg }}</p>
                    </div>

                    <div class="space-y-2">
                        <Label for="email" label="Email" />
                        <TextInput 
                            id="email" 
                            v-model="email" 
                            type="email" 
                            placeholder="Enter your email"
                            :error-message="validationError.email"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="password" label="Password" />
                        <TextInput
                            id="password"
                            v-model="password"
                            type="password"
                            placeholder="Enter your password"
                            :error-message="validationError.password"
                        />
                    </div>

                    <Button type="submit" class="w-full" :disabled="isDisabled">Login</Button>
                </form>

                <p class="text-center text-sm text-slate-600">
                    Don't have an account?
                    <button
                        type="button"
                        class="ml-1 font-semibold text-indigo-600 transition hover:text-indigo-500"
                        @click="appStore.setView('Register')"
                    >
                        Register
                    </button>
                </p>
            </div>
        </div>
    </section>
</template>