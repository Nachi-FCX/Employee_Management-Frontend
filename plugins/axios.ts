import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
      'Content-Type': 'application/json',
      
    },
    
  })
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
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
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  })

