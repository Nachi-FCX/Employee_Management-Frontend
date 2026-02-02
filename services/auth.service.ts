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



export const authService = {
  getApiBase() {
    return useRuntimeConfig().public.apiBase || ''
  },

  async login(payload: LoginPayload) {
    return await $fetch<LoginResponse>(
      `${this.getApiBase()}/api/login`,
      {
        method: 'POST',
        body: payload
      }
    )
  },


  async signupRoot(payload: RootSignupPayload) {
    return await $fetch<SignupResponse>(
      `${this.getApiBase()}/api/root/signup`,
      {
        method: 'POST',
        body: payload
      }
    )
  },


  async signup(payload: any) {
    return await $fetch<SignupResponse>(
      `${this.getApiBase()}/api/signup`,
      {
        method: 'POST',
        body: payload
      }
    )
  }
}
