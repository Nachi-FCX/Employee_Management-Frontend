import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { companySchema } from '~/utils/validators'
import type { Ref, ComputedRef } from 'vue'

export interface UseCompanyFormReturn {
  companyName: Ref<string>
  companyNameProps: Ref<Record<string, any>>
  companyEmail: Ref<string>
  companyEmailProps: Ref<Record<string, any>>
  industry: Ref<string>
  industryProps: Ref<Record<string, any>>
  errors: ComputedRef<Partial<Record<string, string>>>
  validateCompanyForm: () => Promise<any | null>
}

export function useCompanyForm(): UseCompanyFormReturn {
  const form = useForm({
    validationSchema: toTypedSchema(companySchema),
    validateOnMount: false,
    initialValues: {
      companyName: '',
      companyEmail: '',
      industry: ''
    }
  })

  const [companyName, companyNameProps] =
    form.defineField('companyName', { validateOnModelUpdate: false })

  const [companyEmail, companyEmailProps] =
    form.defineField('companyEmail', { validateOnModelUpdate: false })

  const [industry, industryProps] =
    form.defineField('industry', { validateOnModelUpdate: false })

  const validateCompanyForm = async () => {
    const result = await form.validate()
    if (!result.valid) return null

    return {
      name: companyName.value,
      email: companyEmail.value,
      industry: industry.value
    }
  }

  return {
    companyName,
    companyNameProps,
    companyEmail,
    companyEmailProps,
    industry,
    industryProps,
    errors: form.errors,
    validateCompanyForm
  }
}
