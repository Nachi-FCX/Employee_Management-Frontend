export interface Employee {
  employee_code?: string
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: Date | null
  join_date: Date | null
  salary: string
  department: string
  role_id?: number | null

  role_name?: string
}
