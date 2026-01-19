import { z } from 'zod'
import type { Employee } from '~/types/employee'

export const RegistrationValidationSchema = z.object({
  name: z.string().min(2, 'Name should be at least 2 characters long'),
  dateofbirth: z.string(),
  gender: z.string(),
  email: z.email('Email is not valid'),
  identification_number: z.string(),
  Number: z.string(),
  address: z.string(),
  role: z.string(),
  contract_type: z.string(),
  document_required: z.string()
})
