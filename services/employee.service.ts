// import type { Employee } from '~/types/employee'

// export const employeeService = {
//   async createEmployee(payload: Employee) {
//     const { $api } = useNuxtApp()
//     const { data } = await $api.post('/api/createemployees', payload)
//     return data
//   },

//   async getEmployees() {
//     const { $api } = useNuxtApp()
//     const { data } = await $api.get('/api/employees')
//     return data
//   },

//   async deleteEmployee(id: number) {
//     const { $api } = useNuxtApp()
//     await $api.delete(`/api/employees/${id}`)
//   }
// }


import type { CreateEmployeePayload, Employee } from '~/types/employee'


export const employeeService = {
  async createEmployee(payload: CreateEmployeePayload) {
    const { $api } = useNuxtApp()
    const { data } = await $api.post('/api/employees', payload)
    return data
  },

  async getEmployees(): Promise<Employee[]> {
    const { $api } = useNuxtApp()
    // console.log("getEmployees called with:", company_id);
    // const authStore = useAuthStore()
    // const companyId = authStore.user?.company_id

  //     console.log("ROLE:", authStore.role)
  //   console.log("USER:", authStore.user)

  //   const companyId =
  // authStore.role === 'root'
  //   ? authStore.selectedCompanyId
  //   : authStore.user?.company_id

    const companyId = localStorage.getItem('selectedCompanyId')


    const { data } = await $api.get(`/api/employees`, {
      params: companyId ? {company_id : Number(companyId) } : undefined
    })
    console.log(data.employees);
    return data.employees
    
  },

  async deleteEmployee(id: number) {
    const { $api } = useNuxtApp()
    await $api.delete(`/api/employees/${id}`)
  }
}
