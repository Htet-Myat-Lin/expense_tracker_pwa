import type { TransactionPayload } from "../../type";
import { axiosInstance } from "../axios.instance";

export class TransactionService {
    static async create(payload: TransactionPayload) {
        return (await axiosInstance.post("/transactions", payload)).data
    }

    static async update(id: string, payload: TransactionPayload) {
        return (await axiosInstance.patch(`/transactions/${id}`, payload)).data
    }

    static async delete(id: string) {
        return (await axiosInstance.delete(`/transactions/${id}`)).data
    }

    static async getAll(filters: Record<string, string | number | undefined> = {}) {
        const params = new URLSearchParams()

        if (filters?.type && filters.type !== 'ALL') {
            params.set("type", String(filters.type))
        }

        if (filters?.page !== undefined && filters.page !== null) {
            params.set("page", String(filters.page))
        }

        const queryString = params.toString()
        const endPoint = queryString ? `/transactions?${queryString}` : '/transactions'
        return (await axiosInstance.get(endPoint)).data
    }

    static async getCategories() {
        return (await axiosInstance.get("/categories")).data
    }

    static async getReport() {
        return (await axiosInstance.get("/transactions/report")).data
    }
}