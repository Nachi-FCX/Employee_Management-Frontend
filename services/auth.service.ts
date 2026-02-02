import { config } from "process"

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
  async login(payload: LoginPayload) {
    const { $api } = useNuxtApp()
    const { data } = await $api.post('/api/login', payload)
    return data
  },

  async signupRoot(payload: RootSignupPayload) {
    const { $api } = useNuxtApp()
    const { data } = await $api.post('/api/root/signup', payload)
    return data
  }
}


