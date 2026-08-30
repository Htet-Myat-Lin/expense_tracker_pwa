export type View = "Dashboard" | "Login" | "Register" | "List"

export type User = Record<"id" | "name" | "email", string>

export type TransactionType = "EXPENSE" | "INCOME"

export type CategoryName = "Food" | "Entertainment" | "Shopping" | "Transport" | "Health" | "Utilities" | "Salary" | "Freelance" | "Pocket Money" | "Investment" | "Others"

export interface Category {
    id: string;
    type: TransactionType | null;
    name: CategoryName
}

export interface Transaction {
    id: string;
    name: string;
    type: TransactionType;
    amount: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export type TransactionPayload = Pick<Transaction, "name" | "type" | "amount"> & { categoryId: string }

export type DashboardReport = Record<"balance" | "income" | "expense", number>