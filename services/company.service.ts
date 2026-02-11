import { api } from '~/plugins/axios'
import type { Company } from '~/types/company'

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
  async setupCompany(payload: CompanyPayload) {

    const { $api } = useNuxtApp()
    const res = await $api.post('/api/root/create-company', payload)
    return res.data
  },

  async getCompanies(token: string): Promise<Company[]> {
    
    const response = await api.get<Company[]>(
      '/api/root/getcompanies',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )

    console.log('response:' , response.data)

    return response.data
  },
 
  
}
