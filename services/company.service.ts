export interface CompanyPayload {
  company_name: string
  company_code: string
  contact_email: string
  industry?: string
}


export interface CompanyResponse {
  message?: string
  company?: {
    id: number
    name: string
    email: string
    industry: string
  }
}

export const companyService = {
  async setupCompany(payload: CompanyPayload): Promise<CompanyResponse> {
    const { $api } = useNuxtApp()
    const res = await $api.post('/api/create-company', payload)
    return res.data
  }
}
