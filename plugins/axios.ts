import axios from 'axios'
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: config.public.baseUrl,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Attach token
  api.interceptors.request.use((req) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      req.headers.Authorization = `Bearer ${authStore.token}`
    }
    return req
  })

  // SAFE response interceptor (Nuxt-safe)
  api.interceptors.response.use(
    (res) => res,
    (err) => {
      const message =
        err.response?.data?.message ||
        err.message ||
        'API Error'

      if (err.response?.status === 401) {
        const authStore = useAuthStore()
        authStore.logout()
      }

      // 🔑 ALWAYS reject a real Error
      return Promise.reject(new Error(message))
    }
  )

  return {
    provide: {
      api
    }
  }
})
