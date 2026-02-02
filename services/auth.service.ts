/* =========================
   TYPES
========================= */

export interface LoginPayload {
  username: string
  password: string
  role: 'root' | 'employee'
}

export interface LoginResponse {
  token?: string
  message?: string
}

export interface RootSignupPayload {
  fullName: string
  username: string
  email: string
  phone: string
  password: string
}

export interface SignupResponse {
  message?: string
  user_id?: number
  employee_id?: number
}

/* =========================
   AUTH SERVICE
========================= */

export const authService = {
  getApiBase() {
    return useRuntimeConfig().public.apiBase || ''
  },

  /* ----------------------------------
     LOGIN (ROOT / EMPLOYEE)
  ----------------------------------- */
  async login(payload: LoginPayload) {
    return await $fetch<LoginResponse>(
      `${this.getApiBase()}/login`,
      {
        method: 'POST',
        body: payload
      }
    )
  },

  /* ----------------------------------
     ROOT SIGNUP (STEP-2 / SKIP)
  ----------------------------------- */
  async signupRoot(payload: RootSignupPayload) {
    return await $fetch<SignupResponse>(
      `${this.getApiBase()}/api/root/signup`,
      {
        method: 'POST',
        body: payload
      }
    )
  },

  /* ----------------------------------
     GENERIC SIGNUP (OPTIONAL / LEGACY)
  ----------------------------------- */
  async signup(payload: any) {
    return await $fetch<SignupResponse>(
      `${this.getApiBase()}/api/auth/signup`,
      {
        method: 'POST',
        body: payload
      }
    )
  }
}
