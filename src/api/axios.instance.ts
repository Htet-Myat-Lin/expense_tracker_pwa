import axios from 'axios'

const apiBaseUrl = import.meta.env.VITE_API_URL

export const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl.replace(/\/$/, '')}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})