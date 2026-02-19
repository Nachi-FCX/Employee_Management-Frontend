import { useAuthStore } from '~/stores/auth'

export interface LoginPayload {
  username: string
  password: string
  role: 'root' | 'employee'
}

export interface LoginResponse {
  token: string
  message?: string
}


export interface RootSignupPayload {
  full_name: string
  username: string
  email: string
  phone?: string
  password: string
}



export interface SignupResponse {
  message: string
  token: string
  user: {
    id: number
    full_name: string
    username: string
    email: string
  }
}

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
  confirm_password?: string
}

export interface ChangePasswordResponse {
  message?: string
  password?: string
}


export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { $api } = useNuxtApp()
    const { data } = await $api.post('/api/login', payload)

    const normalized = data?.data ?? data
    return normalized
  },

  async signupRoot(payload: RootSignupPayload): Promise<SignupResponse> {
    const { $api } = useNuxtApp()
    const res = await $api.post('/api/root/signup', payload)
    return res.data
  },

  async changePassword(payload: ChangePasswordPayload): Promise<ChangePasswordResponse> {
    const { $api } = useNuxtApp()
    const auth = useAuthStore()

    // Get user ID from auth store
    const userId = auth.user?.id
    
    if (!userId) {
      console.error('Auth store state:', auth.user)
      console.error('Token:', auth.token)
      throw new Error('User ID not found in session. Please log out and log in again.')
    }

    const requestBody = {
      id: userId,
      oldpassword: payload.current_password,
      newpassword: payload.new_password
    }

    const { data } = await $api.put('/api/root/change-password', requestBody)
    return data?.data ?? data ?? { message: 'password changed successfully' }
  }
}


