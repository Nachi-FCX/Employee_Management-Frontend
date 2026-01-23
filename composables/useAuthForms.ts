import { ref, onMounted, computed, type Ref, type ComputedRef } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  loginSchema,
  signupSchema,
  getPasswordStatus,
  type PasswordStatus
} from '~/utils/validators'
import { useAuthStore } from '~/stores/auth'

/* LOGIN FORM (API CALLS ALLOWED) */

export interface UseLoginFormReturn {
  username: Ref<string>
  usernameProps: Ref<Record<string, any>>
  password: Ref<string>
  passwordProps: Ref<Record<string, any>>
  rememberMe: Ref<boolean>
  serverError: Ref<string>
  showPassword: Ref<boolean>
  isSubmitting: Ref<boolean>
  errors: ComputedRef<Partial<Record<string, string>>>
  handleLogin: () => Promise<void>
  togglePassword: () => void
}

export function useLoginForm(
  loginType: Ref<'root' | 'employee'>
): UseLoginFormReturn {
  const auth = useAuthStore()
  const serverError = ref('')
  const showPassword = ref(false)

  const form = useForm({
    validationSchema: toTypedSchema(loginSchema),
    validateOnMount: false,
    initialValues: {
      username: '',
      password: '',
      rememberMe: false
    }
  })

  const [username, usernameProps] = form.defineField('username', {
    validateOnModelUpdate: false
  })

  const [password, passwordProps] = form.defineField('password', {
    validateOnModelUpdate: false
  })

  const [rememberMe] = form.defineField('rememberMe')

  onMounted(() => {
    if (process.client) {
      const saved = localStorage.getItem('rememberedUser')
      if (saved) {
        form.setValues({ username: saved, rememberMe: true })
      }
    }
  })

  const handleLogin = form.handleSubmit(async (values) => {
    serverError.value = ''

    try {
      await auth.login({
        username: values.username,
        password: values.password,
        role: loginType.value
      })

      if (process.client) {
        values.rememberMe
          ? localStorage.setItem('rememberedUser', values.username)
          : localStorage.removeItem('rememberedUser')
      }
    } catch (err: any) {
      serverError.value = err?.message || 'Login failed.'
      form.setValues({ password: '' })
    }
  })

  return {
    username,
    usernameProps,
    password,
    passwordProps,
    rememberMe,
    serverError,
    showPassword,
    isSubmitting: form.isSubmitting,
    errors: form.errors,
    handleLogin,
    togglePassword: () => (showPassword.value = !showPassword.value)
  }
}

/* SIGNUP FORM (VALIDATION ONLY – NO API)*/

export interface RootSignupPayload {
  fullName: string
  username: string
  email: string
  phone: string
  password: string
}

export interface UseSignupFormReturn {
  fullName: Ref<string>
  fullNameProps: Ref<Record<string, any>>
  username: Ref<string>
  usernameProps: Ref<Record<string, any>>
  email: Ref<string>
  emailProps: Ref<Record<string, any>>
  phone: Ref<string>
  phoneProps: Ref<Record<string, any>>
  password: Ref<string>
  passwordProps: Ref<Record<string, any>>
  confirmPassword: Ref<string>
  confirmPasswordProps: Ref<Record<string, any>>
  agreementAccepted: Ref<boolean>
  passwordStatus: ComputedRef<PasswordStatus>
  passwordStrengthClass: ComputedRef<string>
  errors: ComputedRef<Partial<Record<string, string>>>

  /** 🔥 IMPORTANT */
  validateRootForm: () => Promise<RootSignupPayload | null>
}

export function useSignupForm(): UseSignupFormReturn {
  const form = useForm({
    validationSchema: toTypedSchema(signupSchema),
    validateOnMount: false,
    initialValues: {
      fullName: '',
      username: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      agreementAccepted: false
    }
  })

  const [fullName, fullNameProps] = form.defineField('fullName', {
    validateOnModelUpdate: false
  })

  const [username, usernameProps] = form.defineField('username', {
    validateOnModelUpdate: false
  })

  const [email, emailProps] = form.defineField('email', {
    validateOnModelUpdate: false
  })

  const [phone, phoneProps] = form.defineField('phone', {
    validateOnModelUpdate: false
  })

  const [password, passwordProps] = form.defineField('password', {
    validateOnModelUpdate: false
  })

  const [confirmPassword, confirmPasswordProps] =
    form.defineField('confirmPassword', {
      validateOnModelUpdate: false
    })

  const [agreementAccepted] =
    form.defineField<boolean>('agreementAccepted')

  const passwordStatus = computed(() =>
    getPasswordStatus(form.values.password || '')
  )

  const passwordStrengthClass = computed(() => {
    if (!form.values.password) return ''
    const score = passwordStatus.value.score
    return score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong'
  })

  
  const validateRootForm = async (): Promise<RootSignupPayload | null> => {
    const result = await form.validate()
    if (!result.valid) return null

    return {
      fullName: fullName.value,
      username: username.value,
      email: email.value,
      phone: phone.value,
      password: password.value
    }
  }

  return {
    fullName,
    fullNameProps,
    username,
    usernameProps,
    email,
    emailProps,
    phone,
    phoneProps,
    password,
    passwordProps,
    confirmPassword,
    confirmPasswordProps,
    agreementAccepted,
    passwordStatus,
    passwordStrengthClass,
    errors: form.errors,
    validateRootForm
  }
}
