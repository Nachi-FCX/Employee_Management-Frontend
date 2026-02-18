// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { navigateTo, useCookie } from '#imports'
import { authService } from '~/services/auth.service'

type Role = 'root' | 'employee'

interface User {
  username: string
  role: Role
  companyCompleted: boolean
  company_id?: number
}

export const useAuthStore = defineStore('auth', () => {
  const tokenCookie = useCookie<string | null>('token')
  const user = ref<User | null>(null)
  const token = ref<string | null>(tokenCookie.value ?? null)

  
  const loggedIn = computed(() => Boolean(token.value))
  const role = computed(() => user.value?.role ?? null)
  const companyCompleted = computed(() => user.value?.companyCompleted ?? false)
  const selectedCompanyId = ref<number | null>(null)

  // 🔐 Safe JWT decode
  function decodeToken(jwt: string) {
    try {
      const payload = jwt.split('.')[1] || "";
      return JSON.parse(atob(payload))
    } catch {
      return null
    }
  }

  // ✅ BACKEND type → FRONTEND role
  function mapRoleFromType(type?: string): Role {
    if (!type) return 'employee'

    switch (type.toUpperCase()) {
      case 'ROOT':
        return 'root'
      case 'EMPLOYEE':
        return 'employee'
      default:
        return 'employee'
    }
  }

  function setToken(jwt: string) {
    token.value = jwt
    tokenCookie.value = jwt
    if (process.client) {
      localStorage.setItem('token', jwt)
    }
  }

  function clearAuth() {
    token.value = null
    user.value = null
    tokenCookie.value = null
    if (process.client) {
      localStorage.removeItem('token')
    }
  }

  if (token.value) {
  const decoded = decodeToken(token.value)

  if (decoded) {
    user.value = {
      username: decoded.username ?? '',
      role: mapRoleFromType(decoded.type),
      companyCompleted: Boolean(decoded.companyCompleted),
      company_id: decoded.company_id
    }
  }
}
  // ✅ SAFE LOGIN
  async function login(payload: {
    username: string
    password: string
    role: Role
  }) {
    try {
      const res = await authService.login(payload)

      if (!res?.token) {
        throw new Error(res?.message || 'Invalid credentials')
      }

      setToken(res.token)

      const decoded = decodeToken(res.token)
        
      user.value = {
        username: payload.username,
        role: mapRoleFromType(decoded?.type), // ✅ FIXED
        companyCompleted: Boolean(decoded?.companyCompleted),
         company_id: decoded?.company_id 
      }

      // 🚨 Navigation ONLY on client
      if (!process.client) return

      if (user.value.role === 'root' && !user.value.companyCompleted) {
        await navigateTo('/dashboard')
      } else {
        await navigateTo('/dashboard')
      }

    } catch (err: any) {
      console.error('Login failed:', err.message)
      throw new Error(err.message || 'Login failed')
    }
  }

  function markCompanyCompleted() {
    if (user.value) {
      user.value.companyCompleted = true
    }
  }

  function logout() {
    clearAuth()
    if (process.client) {
      navigateTo('/login')
    }
  }

  return {
    user,
    token,
    loggedIn,
    role,
    companyCompleted,
    selectedCompanyId,
    login,
    logout,
    markCompanyCompleted,
    // setToken
  }
})
