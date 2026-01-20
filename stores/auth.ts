// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { navigateTo } from '#imports'
import { authService } from '~/services/auth.service'

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    const loggedIn = computed(() => !!token.value)
    const role = computed(() => user.value?.role || null)

    // Helper to decode JWT (Internal to store logic)
    function parseJwt(token: string) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        return payload
      } catch { return null }
    }

    async function login(username: string, password: string) {
      try {
        const res = await authService.login(username, password)

        if (!res?.token) {
          throw new Error(res?.message || 'Invalid credentials')
        }

        token.value = res.token
        const decoded = parseJwt(res.token)

        user.value = {
          username,
          role: String(decoded?.roleName ?? decoded?.role ?? null)
        }

        if (process.client) await navigateTo('/dashboard')
      } catch (err: any) {
        throw new Error(err?.message || 'Login failed')
      }
    }

    async function signup(payload: SignupPayload) {
      try {
        const res = await authService.signup(payload)

        if (!res?.user_id || !res?.employee_id) {
          throw new Error(res?.message || 'Signup failed')
        }

        if (process.client) await navigateTo('/login')
        return res
      } catch (err: any) {
        throw new Error(err?.message || 'Signup failed')
      }
    }

    function logout() {
      user.value = null
      token.value = null
      navigateTo('/login')
    }

    return { user, token, loggedIn, role, login, signup, logout }
  },
  { persist: true }
)