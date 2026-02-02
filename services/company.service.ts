import { useRuntimeConfig } from '#imports'

export interface CompanyPayload {
  name: string
  email: string
  industry: string
}

export const companyService = {
  getApiBase() {
    return useRuntimeConfig().public?.apiBase || ''
  },

  async setupCompany(payload: CompanyPayload) {
    const url = `${this.getApiBase()}/api/company`

    return await $fetch(url, {
      method: 'POST',
      body: payload
    })
  }
}
