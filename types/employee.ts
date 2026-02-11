export interface Employee {
  id: number
  employee_code: string
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  join_date: string
  date_of_birth: string | null
  salary: number | undefined
  department: {
    department_id: number
    name: string
  }
  role: {
    role_id: number
    name: string
  }
}

export interface CreateEmployeePayload {
  company_id?: number     
  first_name: string
  last_name?: string
  email: string
  department_id: number
  role_id: number
  username: string
  password: string
  salary?: number
}