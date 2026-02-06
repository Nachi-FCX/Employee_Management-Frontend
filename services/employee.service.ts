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

  async getEmployees(companyId?: number): Promise<Employee[]> {
    const { $api } = useNuxtApp()
    const { data } = await $api.get('/api/employees', {
      params: companyId ? { company_id: companyId } : {}
    })
    return data.employees
  },

  async deleteEmployee(id: number) {
    const { $api } = useNuxtApp()
    await $api.delete(`/api/employees/${id}`)
  }
}
