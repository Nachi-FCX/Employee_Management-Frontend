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


export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const { $api } = useNuxtApp()
    const { data } = await $api.post('/api/login', payload)
    
  

  if (data.token) {
      localStorage.setItem('token', data.token)
      console.log('TOKEN STORED:', data.token)
    }

    return data
  },

  async signupRoot(payload: RootSignupPayload): Promise<SignupResponse> {
    const { $api } = useNuxtApp()
    const res = await $api.post('/api/root/signup', payload)
    return res.data
  }
}


