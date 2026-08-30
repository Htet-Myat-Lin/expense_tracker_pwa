import { axiosInstance } from "../axios.instance";

export class AuthService {
    static async login(payload: Record<"email" | "password", string>) {
        return (await axiosInstance.post("/auth/login", payload)).data
    }

    static async register(payload: Record<"username" | "email" | "password", string>) {
        return (await axiosInstance.post("/auth/register", payload)).data
    }

    static async logout() {
        return (await axiosInstance.post("/auth/logout")).data
    }

    static async getUserProfile() {
        return (await axiosInstance.get("/auth/get-current-user")).data
    }
}