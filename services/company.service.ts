import { api } from '~/plugins/axios'
import type { Company } from '~/types/company'

export interface CompanyPayload {
  name: string
  email: string
  industry: string
}

export const companyService = {
  async setupCompany(payload: CompanyPayload) {
    const response = await api.post('/api/company', payload)
    return response.data
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
  }
}
