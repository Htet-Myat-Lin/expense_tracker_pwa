import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User, View } from "../type";
import { AuthService } from "../api/service/auth.service";

export const useAppStore = defineStore("app", () => {
    const view = ref<View>("Login")
    const user = ref<User | null>(null)

    const setView = (page: View) => {
        view.value = page
    }

    const setUser = (userValue: User | null) => {
        user.value = userValue
    }

    const fetchUserProfile = async () => {
        try {
            const data = await AuthService.getUserProfile()
             if (data.success) {
                setUser(data.content)
                setView("Dashboard")
            }
        } catch {}
    }

    const logout = async () => {
        try {
            const data = await AuthService.logout()
            if (data.success) {
                setUser(null);
                setView("Login");
            }
        } catch {}
    }

    const isAuthenticated = computed(() => !!user.value)

    return {
        view,
        user,
        setView,
        setUser,
        fetchUserProfile,
        isAuthenticated,
        logout
    }
})