<!-- pages/login.vue -->
<template>
  <div class="login-page">
    <!-- BackgroundDecoration Component -->
    <BackgroundDecoration />
    
    <div class="login-card">
      <!-- BrandHeader Component -->
      <BrandHeader subtitle="Employee Management Dashboard" />
      
      <!-- PageHeader Component -->
      <PageHeader
        title="Welcome Back"
        subtitle="Enter your credentials to access your dashboard"
      />
      
      <form @submit.prevent="submit" class="login-form">
        <!-- Username Field -->
        <div class="input-group">
          <label for="username" class="input-label">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 8a3 3 0 100-6 3 3 0 000 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
            <span>Username</span>
          </label>
          <BaseInput
            v-model="username"
            id="username"
            placeholder="Enter your username"
            type="text"
            class="enhanced-input"
          />
        </div>

        <!-- Password Field -->
        <div class="input-group">
          <label for="password" class="input-label">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12 7H4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm-4 5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
            </svg>
            <span>Password</span>
          </label>
          <div class="password-wrap">
            <BaseInput
              v-model="password"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
              class="enhanced-input"
            />
            
          </div>
        </div>

        <!-- Options Row -->
        <div class="form-row">
          <label class="remember">
            <div class="checkbox-wrapper">
              <input type="checkbox" v-model="rememberMe" />
              <span class="checkmark"></span>
            </div>
            <span>Remember me</span>
          </label>

          <NuxtLink to="/forgot-password" class="forgot-link">
            Forgot password?
          </NuxtLink>
        </div>

        <!-- Submit Button -->
        <BaseButton :loading="loading" :disabled="loading" class="submit-btn">
          <template v-if="!loading">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" class="btn-icon">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill="currentColor"/>
            </svg>
            <span>Sign In</span>
          </template>
          <span v-else>Signing in...</span>
        </BaseButton>

        <!-- Sign Up Link -->
        <p class="signup-text">
          Don't have an account?
          <NuxtLink to="/signup" class="signup-link">
            Create account
          </NuxtLink>
        </p>

        <!-- Error Message -->
        <transition name="fade">
          <div v-if="error" class="error-msg">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
            </svg>
            <span>{{ error }}</span>
          </div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'

const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const rememberMe = ref(false)

const auth = useAuthStore()

onMounted(() => {
  if (process.client) {
    const saved = localStorage.getItem('rememberedUser')
    if (saved) {
      username.value = saved
      rememberMe.value = true
    }
  }
})

const submit = async () => {
  error.value = ''

  if (!username.value || !password.value) {
    error.value = 'Please enter username and password'
    return
  }

  loading.value = true
  try {
    await auth.login(username.value, password.value)

    if (rememberMe.value && process.client) {
      localStorage.setItem('rememberedUser', username.value)
    } else if (process.client) {
      localStorage.removeItem('rememberedUser')
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Login failed. Please check your credentials.'
    password.value = ''
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: linear-gradient(135deg, #f6f9fc 0%, #f0f7ff 100%);
  position: relative;
  overflow: hidden;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.08),
    0 0 0 1px rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.input-label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  
  svg {
    opacity: 0.6;
  }
}

.enhanced-input {
  :deep(input) {
    width: 90%;
    padding: 14px 16px;
    font-size: 0.95rem;
    color: #0f172a;
    background: #ffffff;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    transition: all 0.2s ease;
    
    &:focus {
      outline: none;
      border-color: #06b6d4;
      box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
    }
    
    &::placeholder {
      color: #94a3b8;
    }
  }
}

.password-wrap {
  position: relative;
  width: 100%;
  
  .toggle-password {
    position: absolute;
    right: 20px;
    top: 60%;
    transform: translateY(-50%);
    background: none;
    border: none;
    padding: 8px;
    color: #64748b;
    cursor: pointer;
    transition: color 0.2s ease;
    
    &:hover {
      color: #06b6d4;
    }
    
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px rgba(6, 182, 212, 0.2);
      border-radius: 6px;
    }
  }
}

.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 4px 0;
}

.remember {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.875rem;
  color: #475569;
  cursor: pointer;
  
  .checkbox-wrapper {
    position: relative;
    width: 18px;
    height: 18px;
    
    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
      
      &:checked ~ .checkmark {
        background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
        border-color: transparent;
        
        &::after {
          opacity: 1;
        }
      }
    }
    
    .checkmark {
      position: absolute;
      top: 0;
      left: 0;
      width: 18px;
      height: 18px;
      border: 2px solid #cbd5e1;
      border-radius: 4px;
      transition: all 0.2s ease;
      
      &::after {
        content: '';
        position: absolute;
        left: 5px;
        top: 1px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
        opacity: 0;
        transition: opacity 0.2s ease;
      }
    }
  }
}

.forgot-link {
  font-size: 0.875rem;
  font-weight: 600;
  color: #06b6d4;
  text-decoration: none;
  transition: color 0.2s ease;
  
  &:hover {
    color: #0891b2;
    text-decoration: underline;
  }
}

.submit-btn {
  width: 100%;
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
  color: white;
  padding: 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 12px 24px rgba(6, 182, 212, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .btn-icon {
    transition: transform 0.2s ease;
  }
  
  &:hover:not(:disabled) .btn-icon {
    transform: translateX(4px);
  }
}

.signup-text {
  text-align: center;
  font-size: 0.95rem;
  color: #64748b;
  margin: 8px 0 0 0;
  
  .signup-link {
    font-weight: 600;
    color: #06b6d4;
    text-decoration: none;
    margin-left: 6px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.error-msg {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 0.9rem;
  font-weight: 500;
  margin-top: 4px;
  
  svg {
    flex-shrink: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 480px) {
  .login-card {
    padding: 32px 24px;
    border-radius: 16px;
  }
  
  .title {
    font-size: 1.5rem;
  }
  
  .submit-btn {
    padding: 14px;
  }
}

@media (max-width: 360px) {
  .login-card {
    padding: 24px 20px;
  }
  
  .form-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
}
</style>