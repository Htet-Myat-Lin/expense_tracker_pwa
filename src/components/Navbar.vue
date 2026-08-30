<template>
    <nav class="bg-indigo-600 px-6 py-2">
        <div class="w-full max-w-7xl mx-auto flex items-center justify-between">
            <div>
                <span class="text-slate-50 text-xs font-sans">Good Morning</span>
                <h3 class="font-semibold text-gray-50 font-mono">{{ appStore.user?.name }}</h3>
            </div>
            <div class="cursor-pointer text-gray-50 text-lg" @click="isOpen = true">
                <MdOutlinedLogout/>
            </div>
        </div>
    </nav>
    
    <Modal
        @close="closeModal"
        title="Are you sure to log out?"
        :is-open="isOpen"
        max-width="max-w-xs"
    >
         <div class="flex items-center justify-between gap-5">
            <Button 
                class="w-1/2"
                @click="handleLogout"
            >
                Yes
            </Button>
            <Button 
                variant="danger" 
                class="w-1/2"
                @click="closeModal"
            >
                No
            </Button>
         </div>
    </Modal>
</template>

<script setup lang="ts">
import { MdOutlinedLogout } from '@kalimahapps/vue-icons';
import { useAppStore } from '../store/app.store';
import { useToast } from 'vue-toastification';
import Modal from "../components/ui/Modal.vue"
import Button from './ui/Button.vue';
import { ref } from 'vue';

const appStore = useAppStore()

const isOpen = ref<boolean>(false)

const closeModal = () => {
    isOpen.value = false
}

const handleLogout = async () => {
    await appStore.logout();
    useToast().success("Logout Successful")
}
</script>