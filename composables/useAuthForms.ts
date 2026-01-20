import { ref, onMounted, computed, type Ref, type ComputedRef } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { useRouter } from 'vue-router';
import { 
  loginSchema, 
  signupSchema, 
  getPasswordStatus, 
  type PasswordStatus 
} from '~/utils/validators';
import { useAuthStore } from '~/stores/auth';

// --- Types for Login Return ---
export interface UseLoginFormReturn {
  username: Ref<string>;
  usernameProps: Ref<Record<string, any>>;
  password: Ref<string>;
  passwordProps: Ref<Record<string, any>>;
  rememberMe: Ref<boolean>;
  serverError: Ref<string>;
  showPassword: Ref<boolean>;
  isSubmitting: Ref<boolean>;
  errors: ComputedRef<Partial<Record<string, string>>>;
  handleLogin: () => Promise<void>;
  togglePassword: () => void;
}

export function useLoginForm(): UseLoginFormReturn {
  const auth = useAuthStore();
  const serverError = ref('');
  const showPassword = ref(false);

  const form = useForm({
    validationSchema: toTypedSchema(loginSchema),
    initialValues: { 
      username: '', 
      password: '', 
      rememberMe: false 
    }
  });

  // Type casting ensures the Ref is treated as a non-nullable string
  const [username, usernameProps] = form.defineField('username', { 
    validateOnModelUpdate: false 
  }) as [Ref<string>, Ref<Record<string, any>>];

  const [password, passwordProps] = form.defineField('password', { 
    validateOnModelUpdate: false 
  }) as [Ref<string>, Ref<Record<string, any>>];

  const [rememberMe] = form.defineField('rememberMe') as [Ref<boolean>, Ref<Record<string, any>>];

  onMounted(() => {
    if (process.client) {
      const saved = localStorage.getItem('rememberedUser');
      if (saved) form.setValues({ username: saved, rememberMe: true });
    }
  });

  const handleLogin = form.handleSubmit(async (values) => {
    serverError.value = '';
    try {
      await auth.login(values.username, values.password);
      if (process.client) {
        if (values.rememberMe) localStorage.setItem('rememberedUser', values.username);
        else localStorage.removeItem('rememberedUser');
      }
    } catch (e: any) {
      serverError.value = e.message || 'Login failed.';
      form.setValues({ password: '' }); 
    }
  });

  return { 
    username, usernameProps, password, passwordProps, rememberMe, 
    serverError, showPassword, isSubmitting: form.isSubmitting, 
    errors: form.errors, handleLogin, 
    togglePassword: () => { showPassword.value = !showPassword.value } 
  };
}

// --- Types for Signup Return ---
export interface UseSignupFormReturn {
  username: Ref<string>;
  usernameProps: Ref<Record<string, any>>;
  email: Ref<string>;
  emailProps: Ref<Record<string, any>>;
  phone: Ref<string>;
  phoneProps: Ref<Record<string, any>>;
  password: Ref<string>;
  passwordProps: Ref<Record<string, any>>;
  confirmPassword: Ref<string>;
  confirmPasswordProps: Ref<Record<string, any>>;
  agreementAccepted: Ref<boolean>;
  passwordStatus: ComputedRef<PasswordStatus>;
  passwordStrengthClass: ComputedRef<string>;
  submitError: Ref<string>;
  isSubmitting: Ref<boolean>;
  errors: ComputedRef<Partial<Record<string, string>>>;
  handleSignup: () => Promise<void>;
}

export function useSignupForm(): UseSignupFormReturn {
  const authStore = useAuthStore();
  const router = useRouter();
  const submitError = ref('');

  const form = useForm({
    validationSchema: toTypedSchema(signupSchema),
    initialValues: { 
      username: '', email: '', phone: '', 
      password: '', confirmPassword: '', agreementAccepted: false 
    }
  });

  // Strict casting for all fields
  const [username, usernameProps] = form.defineField('username') as [Ref<string>, Ref<Record<string, any>>];
  const [email, emailProps] = form.defineField('email') as [Ref<string>, Ref<Record<string, any>>];
  const [phone, phoneProps] = form.defineField('phone') as [Ref<string>, Ref<Record<string, any>>];
  const [password, passwordProps] = form.defineField('password') as [Ref<string>, Ref<Record<string, any>>];
  const [confirmPassword, confirmPasswordProps] = form.defineField('confirmPassword') as [Ref<string>, Ref<Record<string, any>>];
  const [agreementAccepted] = form.defineField('agreementAccepted') as [Ref<boolean>, Ref<Record<string, any>>];

  const passwordStatus = computed(() => getPasswordStatus(form.values.password || ''));
  
  const passwordStrengthClass = computed(() => {
    if (!form.values.password) return '';
    const score = passwordStatus.value.score;
    return score <= 2 ? 'weak' : score <= 4 ? 'medium' : 'strong';
  });

  const handleSignup = form.handleSubmit(async (v) => {
    try {
      await authStore.signup({
        username: v.username,
        email: v.email,
        phone: v.phone,
        password: v.password
      });
      router.push('/dashboard');
    } catch (err: any) {
      submitError.value = err?.message || 'Signup failed.';
    }
  });

  return { 
    username, usernameProps, email, emailProps, phone, phoneProps, 
    password, passwordProps, confirmPassword, confirmPasswordProps, 
    agreementAccepted, passwordStatus, passwordStrengthClass, 
    submitError, isSubmitting: form.isSubmitting, errors: form.errors, handleSignup 
  };
}