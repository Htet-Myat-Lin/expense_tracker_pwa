<script setup lang="ts">
import { ref } from 'vue'
import Button from '../components/ui/Button.vue'
import H2Header from '../components/ui/H2Header.vue'
import Label from '../components/ui/Label.vue'
import TextInput from '../components/ui/TextInput.vue'
import { useAppStore } from '../store/app.store.ts'
import { AuthService } from '../api/service/auth.service.ts'
import { useToast } from 'vue-toastification'
import axios from 'axios'

const appStore = useAppStore()
const toast = useToast()

const username = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const validationError = ref<Record<"username" | "email" | "password" | "confirmPassword", string>>({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
})

const handleRegister = async () => {
    try {
        const payload = {
            username: username.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
        }
        const data = await AuthService.register(payload)
        if (data.success) {
            appStore.setUser(data.content)
            toast.success("User Registration Successful")
            appStore.setView("Dashboard")
        }
    } catch (e) {
        if (axios.isAxiosError(e)) {
            validationError.value["email"] = e.response?.data.content?.email
            validationError.value["password"] = e.response?.data.content?.password
            validationError.value["username"] = e.response?.data.content?.username
            validationError.value["confirmPassword"] = e.response?.data.content?.confirmPassword
        }
    }
}
</script>

<template>
    <section class="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-100 via-white to-indigo-50 px-4 py-6">
        <div class="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.12)] sm:p-8">
            <div class="space-y-4">
                <div class="space-y-2 text-center">
                    <H2Header header="Create account" />
                    <p class="text-sm text-slate-500">Sign up to start managing your expenses</p>
                </div>

                <form class="space-y-5" @submit.prevent="handleRegister">
                    <div class="space-y-2">
                        <Label for="username" label="Username" />
                        <TextInput 
                            id="username" 
                            v-model="username" 
                            type="text" 
                            placeholder="Enter your username"
                            :error-message="validationError.username"
                        />
                    </div>

                    <div class="space-y-2">
                        <Label for="email" label="Email Address" />
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

                    <div class="space-y-2">
                        <Label for="confirmPassword" label="Confirm Password" />
                        <TextInput
                            id="confirmPassword"
                            v-model="confirmPassword"
                            type="password"
                            placeholder="Confirm your password"
                            :error-message="validationError.confirmPassword"
                        />
                    </div>

                    <Button type="submit" class="w-full">Register</Button>
                </form>

                <p class="text-center text-sm text-slate-600">
                    Already have an account?
                    <button
                        type="button"
                        class="ml-1 font-semibold text-indigo-600 transition hover:text-indigo-500"
                        @click="appStore.setView('Login')"
                    >
                        Login
                    </button>
                </p>
            </div>
        </div>
    </section>
</template>
