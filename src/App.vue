<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Dashboard from './page/Dashboard.vue'
import Login from './page/Login.vue'
import Register from './page/Register.vue'
import { useAppStore } from './store/app.store.ts'
import List from './page/List.vue'

const appStore = useAppStore()
const installPromptVisible = ref(false)
let deferredPrompt: any = null

const showInstallPrompt = () => {
  installPromptVisible.value = true
}

const hideInstallPrompt = () => {
  installPromptVisible.value = false
}

const installApp = async () => {
  if (!deferredPrompt) return

  deferredPrompt.prompt()
  await deferredPrompt.userChoice
  deferredPrompt = null
  hideInstallPrompt()
}

onMounted(async () => {
  await appStore.fetchUserProfile()

  window.addEventListener('beforeinstallprompt', (event: Event) => {
    event.preventDefault()
    deferredPrompt = event as any
    showInstallPrompt()
  })
})
</script>

<template>
  <div class="relative">
    <div v-if="!appStore.isAuthenticated">
      <Login v-if="appStore.view === 'Login'" />
      <Register v-if="appStore.view === 'Register'" />
    </div>
    <div v-else>
      <Dashboard v-if="appStore.view === 'Dashboard'" />
      <List v-if="appStore.view === 'List'" />
    </div>

    <div
      v-if="installPromptVisible"
      class="fixed bottom-4 left-1/2 z-50 flex w-[90%] max-w-md -translate-x-1/2 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-lg"
    >
      <div>
        <p class="text-sm font-semibold text-slate-800">Install Expense Tracker</p>
        <p class="text-xs text-slate-500">Add it to your home screen</p>
      </div>

      <div class="flex items-center gap-2">
        <button
          class="rounded-md bg-indigo-600 px-3 py-2 text-xs font-medium text-white"
          @click="installApp"
        >
          Install
        </button>
        <button
          class="text-sm text-slate-500"
          @click="hideInstallPrompt"
          aria-label="Close install prompt"
        >
          ✕
        </button>
      </div>
    </div>
  </div>
</template>
