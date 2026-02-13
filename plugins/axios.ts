import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      
    },
    
  })
  api.interceptors.request.use((config) => {
     const token = useCookie<string | null>('token')

    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }

    return config
  })

  return {
    provide: { api },
  }
});

  
  export const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      
    },
    
  })
  api.interceptors.request.use((config) => {
     const token = useCookie<string | null>('token')

    if (token.value) {
      config.headers.Authorization = `Bearer ${token.value}`
    }

    return config
  })

