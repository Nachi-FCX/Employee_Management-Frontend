// stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { navigateTo } from '#imports'
import { authService } from '~/services/auth.service'

interface User {
  username: string
  role: 'root' | 'employee'
  companyCompleted: boolean
  employeeId?: number | null
  companyId?: number | null
}

export const useAuthStore = defineStore(
  'auth',
  () => {
    /* -------------------------------
       STATE
    -------------------------------- */
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)

    /* -------------------------------
       GETTERS
    -------------------------------- */
    const loggedIn = computed(() => !!token.value)
    const role = computed(() => user.value?.role || null)
    const companyCompleted = computed(
      () => user.value?.companyCompleted ?? false
    )

    /* -------------------------------
       HELPER: Decode JWT
    -------------------------------- */
function parseJwt(token: string) {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

/* -------------------------------
   HELPER: Get Token (for Axios)
-------------------------------- */
function getToken() {
  return token.value
}

/* -------------------------------
   LOGIN (ROOT / EMPLOYEE)
-------------------------------- */
async function login(payload: {
  username: string
  password: string
  role: 'root' | 'employee'
}) {
      try {
        const res = await authService.login(payload)

        if (!res?.token) {
          throw new Error(res?.message || 'Invalid credentials')
        }

        token.value = res.token
        const decoded = parseJwt(res.token)

        user.value = {
          username: payload.username,
          role: String(
            decoded?.roleName ??
            decoded?.role ??
            payload.role
          ) as 'root' | 'employee',
          companyCompleted: Boolean(
            decoded?.companyCompleted ?? false
          ),
          employeeId:
            decoded?.employee_id ??
            decoded?.employeeId ??
            null,
          companyId:
            decoded?.company_id ??
            decoded?.companyId ??
            null
        }

        if (process.client) {
          localStorage.setItem('token', res.token)
          await navigateTo('/dashboard')
        }
      } catch (err: any) {
        throw new Error(err?.message || 'Login failed')
      }
    }

    /* -------------------------------
       AFTER COMPANY SETUP
    -------------------------------- */
    function markCompanyCompleted() {
      if (user.value) {
        user.value.companyCompleted = true
      }
    }

    /* -------------------------------
       SIGNUP (ROOT ONLY)
    -------------------------------- */
    async function signup(payload: SignupPayload) {
      try {
        const res = await authService.signup(payload)

        const decoded = parseJwt(res.token)

        if (process.client) {
          await navigateTo('/login')
        }

        return res
      } catch (err: any) {
        throw new Error(err?.message || 'Signup failed')
      }
    }

    /* -------------------------------
       LOGOUT
    -------------------------------- */
    function logout() {
      user.value = null
      token.value = null

      if (process.client) {
        localStorage.removeItem('token')
      }

      navigateTo('/login')
    }

    /* -------------------------------
       EXPORTS
    -------------------------------- */
      return {
        user,
        token,
        loggedIn,
        role,
        companyCompleted,
        login,
        signup,
        logout,
        markCompanyCompleted,
        getToken
      }
    },
    { persist: true }
  )

