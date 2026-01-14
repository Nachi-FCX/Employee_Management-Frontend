import{z} from 'zod'

export const RegistrationValidationSchema = z.object({
    name: z.string().min(2,'Name should be atleast 2 characters long'),
    email: z.string().email('email is not valid'),
    password: z.string().min(8,'Password should be atleast 8 characters long'),
   passwordconfirm: z.string().min(8,'Password should be atleast 8 characters long')

}).refine((data) => data.password === data.passwordconfirm ,{
    message : 'passwords do not match',
    path :['confirmpassword'] 
})