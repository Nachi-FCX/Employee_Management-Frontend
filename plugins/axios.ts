import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.baseUrl || 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      
    },
    
  })
  api.interceptors.request.use((config) => {
    const token = process.client ? localStorage.getItem('token') : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

  return {
    provide: { api },
  }
});

