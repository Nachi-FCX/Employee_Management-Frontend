import type { Company } from '~/types/company'

export interface CompanyPayload {
  company_name: string
  company_code: string
  contact_email: string
  industry?: string
}


export interface CompanyResponse {
  // message?: string
  // company?: {
  //   id: number
  //   name: string
  //   email: string
  //   industry: string
  // }
  companies: Company[]
}

export const companyService = {
  async setupCompany(payload: CompanyPayload) {

    const { $api } = useNuxtApp()
    const res = await $api.post('/api/root/create-company', payload)
    return res.data
  },

  async getCompanies(token: string): Promise<Company[]> {
    const { $api } = useNuxtApp()

    const companyId = localStorage.getItem('selectedCompanyId')
    const response = await $api.get<CompanyResponse>(
      '/api/root/company',
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
  

    console.log('response:' , response.data)

    return response.data.companies
  },
 async getDepartmentsByCompany(companyId: number) {
    const { $api } = useNuxtApp()

    const response = await $api.get(
      `/api/root/get-departments/${companyId}`
    )

    return response.data
  }
  
}
