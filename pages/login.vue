<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import { loginSchema } from '~/utils/validators';
import { useAuthStore } from '~/stores/auth';

const auth = useAuthStore();
const serverError = ref('');
const showPassword = ref(false);

// 1. Setup Form with Zod Schema
const { errors, handleSubmit, defineField, isSubmitting, setValues } = useForm({
  validationSchema: toTypedSchema(loginSchema),
  initialValues: {
    username: '',
    password: '',
    rememberMe: false
  }
});

// 2. Define fields with validation config
// validateOnModelUpdate: false ensures validation happens on blur/change for better UX
const [username, usernameProps] = defineField('username', {
  validateOnModelUpdate: false,
});
const [password, passwordProps] = defineField('password', {
  validateOnModelUpdate: false,
});
const [rememberMe] = defineField('rememberMe');

// 3. Toggle Visibility logic
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// 4. Remember Me Logic
onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('rememberedUser');
    if (saved) {
      setValues({ username: saved, rememberMe: true });
    }
  }
});

// 5. Unified Submit
const onSubmit = handleSubmit(async (values) => {
  serverError.value = '';
  try {
    await auth.login(values.username, values.password);

    if (values.rememberMe && process.client) {
      localStorage.setItem('rememberedUser', values.username);
    } else if (process.client) {
      localStorage.removeItem('rememberedUser');
    }
  } catch (e: any) {
    serverError.value = e.message || 'Login failed. Please check your credentials.';
    setValues({ password: '' }); 
  }
});
</script>

<template>
  <div class="login-page">
    <BackgroundDecoration />
    <div class="login-card">
      <BrandHeader subtitle="Employee Management Dashboard" />
      <PageHeader title="Welcome Back" subtitle="Enter your credentials to access your dashboard" />
      
      <form @submit.prevent="onSubmit" class="login-form">
        <div class="input-group">
          <BaseInput
            v-model="username"
            v-bind="usernameProps"
            label="Username"
            placeholder="Enter your username"
            :error="errors.username"
          />
        </div>

        <div class="input-group">
          <div class="password-wrap">
            <BaseInput
              v-model="password"
              v-bind="passwordProps"
              label="Password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              :error="errors.password"
            />
          </div>
        </div>

        <div class="form-row">
          <label class="remember-me-label">
            <input 
            type="checkbox" 
            v-model="rememberMe" />
            <span>Remember me</span>
          </label>
          <NuxtLink to="/forgot-password" class="forgot-link">Forgot password?</NuxtLink>
        </div>

        <BaseButton 
          :loading="isSubmitting" 
          type="submit" 
          class="submit-btn"
        >
          Sign In
        </BaseButton>
        <p class="signup-text">
          Don't have an account?
          <NuxtLink to="/signup" class="signup-link">
            Create account
          </NuxtLink>
        </p>
        <transition name="fade">
          <div v-if="serverError" class="server-error-msg">
            {{ serverError }}
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

