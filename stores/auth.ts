import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRuntimeConfig, navigateTo } from '#imports'

interface User {
  username: string
  role: string | null
}

interface SignupPayload {
  username: string
  email: string
  phone: string
  password: string
}

function parseJwt(token: string) {
  try {
    const payload = token.split('.')[1]
    const b64 = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(b64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    const loggedIn = computed(() => !!token.value)
    const role = computed(() => user.value?.role || null)

    // ---------------- LOGIN ----------------
    async function login(username: string, password: string) {
      try {
        const config = useRuntimeConfig()
        const apiBase = config.public?.apiBase || ''

        const url = `${apiBase}/api/auth/login`
        console.debug('[auth] POST', url)

        const res = (await $fetch(url, {
          method: 'POST',
          body: { username, password }
        })) as { token?: string; message?: string }

        console.debug('[auth] response', {
          ok: !!res?.token,
          message: res?.message
        })

        if (!res || !res.token) {
          throw new Error(res?.message || 'Invalid credentials')
        }

        token.value = res.token

        const payload = parseJwt(res.token)
        const roleValue =
          payload?.roleName ??
          payload?.role_name ??
          payload?.roleId ??
          payload?.role ??
          null

        user.value = {
          username,
          role: roleValue ? String(roleValue) : null
        }

        if (process.client) {
          await navigateTo('/dashboard')
        }
      } catch (err: any) {
        throw new Error(err?.message || 'Login failed')
      }
    }

    // ---------------- SIGNUP (Admin Basic) ----------------
    async function signup(payload: SignupPayload) {
      try {
        const config = useRuntimeConfig()
        const apiBase = config.public?.apiBase || ''

        const url = `${apiBase}/api/auth/signup`
        console.debug('[auth] POST', url)

        const res = (await $fetch(url, {
          method: 'POST',
          body: payload
        })) as { token?: string; message?: string }

        console.debug('[auth] response', {
          ok: !!res?.token,
          message: res?.message
        })

        if (!res || !res.token) {
          throw new Error(res?.message || 'Signup failed')
        }

        token.value = res.token

        const jwtPayload = parseJwt(res.token)
        const roleValue =
          jwtPayload?.roleName ??
          jwtPayload?.role_name ??
          jwtPayload?.roleId ??
          jwtPayload?.role ??
          null

        user.value = {
          username: payload.username,
          role: roleValue ? String(roleValue) : null
        }

        if (process.client) {
          await navigateTo('/dashboard')
        }
      } catch (err: any) {
        throw new Error(err?.message || 'Signup failed')
      }
    }

    // ---------------- LOGOUT ----------------
    function logout() {
      user.value = null
      token.value = null
      navigateTo('/login')
    }

    return {
      user,
      token,
      loggedIn,
      role,
      login,
      signup,
      logout
    }
  },
  {
    persist: true
  }
)
