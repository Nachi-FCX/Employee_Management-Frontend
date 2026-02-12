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

  api.interceptors.request.use((request) => {
    if (process.client) {
      const token = localStorage.getItem('token')
      if (token) {
        request.headers = request.headers ?? {}
        request.headers.Authorization = `Bearer ${token}`
      }
    }
    return request
  })

  return {
    provide: {
      api
    }
  }
})
