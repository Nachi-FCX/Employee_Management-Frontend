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
    const companyCompleted = computed(
      () => user.value?.companyCompleted ?? false
    )

    /* ----------------------------------
       Helper: Decode JWT
    ----------------------------------- */
    function parseJwt(token: string) {
      try {
        return JSON.parse(atob(token.split('.')[1]))
      } catch {
        return null
      }
    }

    /* ----------------------------------
       LOGIN (ROOT / EMPLOYEE)
    ----------------------------------- */
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

          // 🔑 THIS IS THE KEY PART
          companyCompleted: Boolean(
            decoded?.companyCompleted ?? false
          )
        }

        /* ----------------------------------
           ROUTING LOGIC (FINAL)
        ----------------------------------- */
        if (process.client) {
          // Root → must complete company first
          if (user.value.role === 'root' && !user.value.companyCompleted) {
            await navigateTo('/onboarding/company')
          } else {
            await navigateTo('/dashboard')
          }
        }
      } catch (err: any) {
        throw new Error(err?.message || 'Login failed')
      }
    }

    /* ----------------------------------
       CALLED AFTER COMPANY SETUP
    ----------------------------------- */
    function markCompanyCompleted() {
      if (user.value) {
        user.value.companyCompleted = true
      }
    }

    /* ----------------------------------
       SIGNUP (ROOT ACCOUNT ONLY)
    ----------------------------------- */
    async function signup(payload: SignupPayload) {
      try {
        const res = await authService.signup(payload)

        if (!res?.user_id) {
          throw new Error(res?.message || 'Signup failed')
        }

        // After signup → go to login
        if (process.client) {
          await navigateTo('/login')
        }

        return res
      } catch (err: any) {
        throw new Error(err?.message || 'Signup failed')
      }
    }

    /* ----------------------------------
       LOGOUT
    ----------------------------------- */
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
      companyCompleted,
      login,
      signup,
      logout,
      markCompanyCompleted
    }
  },
  { persist: true }
)
