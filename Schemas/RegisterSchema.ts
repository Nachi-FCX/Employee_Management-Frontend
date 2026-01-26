import { z } from 'zod'

export const EmployeeValidationSchema = z.object({
  first_name: z.string().min(2, 'First name should be at least 2 characters long'),

  last_name: z.string().min(2, 'Last name should be at least 2 characters long'),

  email: z.string().email('Email is not valid'),

  phone: z.string().min(7, 'Phone number should be at least 7 digits'),

  gender: z.string().min(1, 'Please select a gender'),

  date_of_birth: z.date().nullable(),

  join_date: z.date().nullable(),

  department: z.string().min(1, 'Please select a department'),

  salary: z.number({invalid_type_error: 'Salary must be a number'}).min(0, 'Salary must be a positive number')
})
