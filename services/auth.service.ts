import { useRuntimeConfig } from '#imports'

export const authService = {

  getApiBase() {
    return useRuntimeConfig().public?.apiBase || '' 
  },

  async login(username: string, password: string) {
    const url = `${this.getApiBase()}/api/auth/login`
    return await $fetch<{ token?: string; message?: string }>(url, {             // api call for login
      method: 'POST',
      body: { username, password }
    })
  },

  async signup(payload: any) {
    const url = `${this.getApiBase()}/api/auth/signup`
    return await $fetch<{ message?: string; user_id?: number; employee_id?: number }>(url, {        // api call for signup
      method: 'POST',
      body: payload
    })
  }
}