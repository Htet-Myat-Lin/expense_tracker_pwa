# Expense Tracker - Frontend

Progressive Web App (PWA) https://expense-tracker-tawny-one-13.vercel.app/ for managing personal income and expenses. Built as a single-page application with a state-driven view switcher (no vue-router).

## Tech Stack

- **Vue 3.5** (Composition API / `<script setup>`)
- **TypeScript 6**
- **Vite 8** + **@vitejs/plugin-vue**
- **Pinia 4** (state management)
- **Axios** (HTTP client)
- **Tailwind CSS 4** (CSS-first via `@tailwindcss/vite`)
- **vite-plugin-pwa** (offline support + install prompt)
- **vue-toastification** (notifications)
- **@kalimahapps/vue-icons** (icons)
- **Inter Variable** font

## Project Structure

```
frontend/
├── index.html
├── vite.config.ts
├── package.json
├── public/            # favicon, PWA icons
└── src/
    ├── main.ts        # App bootstrap
    ├── App.vue        # Root component (view switcher + PWA install prompt)
    ├── style.css      # Tailwind import + global overrides
    ├── type/          # TypeScript types
    ├── store/         # Pinia store (auth state + current view)
    ├── api/           # Axios instance + service classes
    │   └── service/   # auth.service.ts, transaction.service.ts
    ├── page/          # Login, Register, Dashboard, List views
    └── components/    # Navbar, cards, transaction rows, reusable UI
        └── ui/        # Button, TextInput, SelectInput, Modal, etc.
```

## Screens / Features

- **Login** / **Register** — cookie-based authentication with inline field validation.
- **Dashboard** — total balance, income/expense summary, and the 4 most recent transactions.
- **List** — full paginated transaction list with type filtering (ALL / INCOME / EXPENSE) and create, edit, and delete via modals.
- **Category system** — categories fetched from the API and filtered by transaction type.
- **PWA** — installable (auto-updating service worker).

## Getting Started

### Prerequisites

- **Node.js** (ES module compatible) and npm.

### Install

```bash
npm install
```

### Environment

Copy or set the API base URL. Only one variable is used:

```bash
VITE_API_URL=https://your-backend.example.com
```

The current `.env` points to `https://expense-tracker-j0w4.onrender.com`. `.env` files are gitignored, so add a local `.env` for development.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check (`vue-tsc -b`) and build for production |
| `npm run preview` | Preview the production build locally |

## Architecture Notes

- **No router** — view switching is managed via a `view` ref in the Pinia store and conditional rendering in `App.vue`.
- **Service classes** — API calls are static methods on `AuthService` and `TransactionService`.
- **Cookie-based auth** — the Axios instance uses `withCredentials: true`; the backend sets an HTTP-only JWT cookie.
- **Local page state** — transaction data is fetched and managed within page components rather than in the store.

## Backend
```bash
https://github.com/Htet-Myat-Lin/expense_tracker_api
```