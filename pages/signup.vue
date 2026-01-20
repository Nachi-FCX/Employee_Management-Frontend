<template>
  <div class="signup-page">
    <div class="signup-container">
      <!-- Left Panel - Brand & Info -->
      <div class="left-panel">
        <div class="brand-section">
          <h1 class="brand-title">Fincorpx</h1>
          <p class="brand-subtitle">Create Admin Account</p>
        </div>
        
        <!-- Progress Steps -->
        <div class="progress-section">
          <div class="step active">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">Account Details</div>
              <div class="step-status">Current Step</div>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">Admin Setup</div>
              <div class="step-status">Next Step</div>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">Complete</div>
              <div class="step-status">Final Step</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel - Form -->
      <div class="right-panel">
        <div class="form-header">
          <h2>Admin Registration</h2>
          <p class="form-subtitle">
            Create an admin account to access the employee management dashboard
          </p>
        </div>

        <form @submit.prevent="handleSignup" class="signup-form">
          <!-- Form Grid -->
          <div class="form-grid">
            <!-- Username -->
            <div class="form-group">
              <label for="username">Username</label>
              <BaseInput
                v-model="form.username"
                id="username"
                placeholder="Useranme"
                type="text"
                :error="errors.username"
              />
              <div v-if="errors.username" class="field-error">{{ errors.username }}</div>
            </div>

            <!-- Email -->
            <div class="form-group">
              <label for="email">Email Address</label>
              <BaseInput
                v-model="form.email"
                id="email"
                type="email"
                placeholder="email"
                :error="errors.email"
              />
              <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
            </div>

            <!-- Phone -->
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <BaseInput
                v-model="form.phone"
                id="phone"
                type="tel"
                placeholder="Phone number"
                :error="errors.phone"
              />
              <div v-if="errors.phone" class="field-error">{{ errors.phone }}</div>
            </div>

            <!-- Password -->
            <div class="form-group password-group">
              <label for="password">Password</label>
              <div class="password-input-wrapper">
                <BaseInput
                  v-model="form.password"
                  id="password"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter password"
                  :error="errors.password"
                />
                
              </div>
              <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
              
              <!-- Password Requirements -->
              <div class="password-requirements">
                <div class="requirements-title">Password must contain:</div>
                <ul class="requirements-list">
                  <li :class="{ fulfilled: passwordHasMinLength }">
                    <span class="requirement-check">{{ passwordHasMinLength ? '✓' : '○' }}</span>
                    At least 8 characters
                  </li>
                  <li :class="{ fulfilled: passwordHasUppercase }">
                    <span class="requirement-check">{{ passwordHasUppercase ? '✓' : '○' }}</span>
                    One uppercase letter
                  </li>
                  <li :class="{ fulfilled: passwordHasLowercase }">
                    <span class="requirement-check">{{ passwordHasLowercase ? '✓' : '○' }}</span>
                    One lowercase letter
                  </li>
                  <li :class="{ fulfilled: passwordHasSpecial }">
                    <span class="requirement-check">{{ passwordHasSpecial ? '✓' : '○' }}</span>
                    One special character
                  </li>
                </ul>
              </div>

              <!-- Password Strength -->
              <div class="password-strength">
                <div class="strength-label">Strength:</div>
                <div class="strength-indicator">
                  <div class="strength-bar" :class="passwordStrengthClass"></div>
                </div>
                <div class="strength-text">{{ passwordStrengthText }}</div>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <div class="password-input-wrapper">
                <BaseInput
                  v-model="form.confirmPassword"
                  id="confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm password"
                  :error="errors.confirmPassword"
                />
                
              </div>
              <div v-if="errors.confirmPassword" class="field-error">{{ errors.confirmPassword }}</div>
            </div>
          </div>

          <!-- Terms Agreement -->
          <div class="terms-agreement">
            <label class="agreement-checkbox">
              <input type="checkbox" v-model="agreementAccepted" />
              <span class="checkbox-custom"></span>
              <span class="agreement-text">
                I acknowledge that I am creating an administrator account. I agree to the 
                <a href="#" class="terms-link">Terms of Service</a> and 
                <a href="#" class="terms-link">Privacy Policy</a>.
              </span>
            </label>
          </div>

          <!-- Submit Button -->
          <BaseButton 
            :loading="loading" 
            type="submit" 
            class="submit-btn"
            :disabled="!agreementAccepted"
          >
            <template v-if="!loading">
              Create Admin Account
            </template>
            <template v-else>
              Creating Account...
            </template>
          </BaseButton>

          <!-- Error Message -->
          <div v-if="submitError" class="error-message">
            {{ submitError }}
          </div>

          <!-- Login Link -->
          <div class="login-prompt">
            Already have an admin account?
            <NuxtLink to="/login" class="login-link">Sign in here</NuxtLink>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const agreementAccepted = ref(false)
const submitError = ref('')

const form = ref({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

// Password validation
const passwordHasMinLength = computed(() => form.value.password.length >= 8)
const passwordHasUppercase = computed(() => /[A-Z]/.test(form.value.password))
const passwordHasLowercase = computed(() => /[a-z]/.test(form.value.password))
const passwordHasNumber = computed(() => /[0-9]/.test(form.value.password))
const passwordHasSpecial = computed(() => /[^A-Za-z0-9]/.test(form.value.password))

const passwordScore = computed(() => {
  let score = 0
  if (passwordHasMinLength.value) score++
  if (passwordHasUppercase.value) score++
  if (passwordHasLowercase.value) score++
  if (passwordHasNumber.value) score++
  if (passwordHasSpecial.value) score++
  return score
})

const passwordStrengthClass = computed(() => {
  if (form.value.password.length === 0) return ''
  if (passwordScore.value <= 2) return 'weak'
  if (passwordScore.value <= 4) return 'medium'
  return 'strong'
})

const passwordStrengthText = computed(() => {
  if (form.value.password.length === 0) return 'Enter password'
  if (passwordScore.value <= 2) return 'Weak'
  if (passwordScore.value <= 4) return 'Medium'
  return 'Strong'
})

// Form validation
const validateForm = () => {
  let isValid = true
  errors.value = { username: '', email: '', phone: '', password: '', confirmPassword: '' }

  if (!form.value.username.trim()) {
    errors.value.username = 'Username is required'
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!form.value.email.trim()) {
    errors.value.email = 'Email is required'
    isValid = false
  } else if (!emailRegex.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email'
    isValid = false
  }

  if (!form.value.phone.trim()) {
    errors.value.phone = 'Phone number is required'
    isValid = false
  }

  if (!form.value.password) {
    errors.value.password = 'Password is required'
    isValid = false
  } else if (passwordScore.value < 3) {
    errors.value.password = 'Please meet all password requirements'
    isValid = false
  }

  if (!form.value.confirmPassword) {
    errors.value.confirmPassword = 'Please confirm your password'
    isValid = false
  } else if (form.value.password !== form.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match'
    isValid = false
  }

  if (!agreementAccepted.value) {
    submitError.value = 'You must accept the terms and conditions'
    isValid = false
  }

  return isValid
}

const handleSignup = async () => {
  submitError.value = ''
  
  if (!validateForm()) {
    return
  }

  loading.value = true
  try {
    await authStore.signup({
      username: form.value.username,
      email: form.value.email,
      phone: form.value.phone,
      password: form.value.password
    })

    router.push('/dashboard')
  } catch (err: any) {
    submitError.value = err?.message || 'Signup failed. Please try again.'
  } finally {
    loading.value = false
  }
}

// Clear errors on input
watch(() => form.value.username, () => errors.value.username = '')
watch(() => form.value.email, () => errors.value.email = '')
watch(() => form.value.phone, () => errors.value.phone = '')
watch(() => form.value.password, () => errors.value.password = '')
watch(() => form.value.confirmPassword, () => errors.value.confirmPassword = '')
watch(agreementAccepted, () => submitError.value = '')
</script>

<style scoped lang="scss">
.signup-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

.signup-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  max-width: 1200px;
  width: 100%;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  min-height: 700px;
}

/* Left Panel */
.left-panel {
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
  padding: 48px 40px;
  color: white;
  display: flex;
  flex-direction: column;
}

.brand-section {
  margin-bottom: 60px;
  
  .brand-title {
    font-size: 2rem;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: white;
  }
  
  .brand-subtitle {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
    font-weight: 500;
  }
}

.progress-section {
  .step {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 16px;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    
    &.active {
      background: rgba(255, 255, 255, 0.2);
      
      .step-number {
        background: white;
        color: #06b6d4;
      }
      
      .step-title {
        opacity: 1;
      }
      
      .step-status {
        opacity: 0.8;
      }
    }
    
    &:not(.active) {
      opacity: 0.7;
    }
  }
  
  .step-number {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  
  .step-content {
    flex: 1;
  }
  
  .step-title {
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 4px;
  }
  
  .step-status {
    font-size: 0.9rem;
    opacity: 0.7;
  }
}

/* Right Panel */
.right-panel {
  padding: 48px 60px;
  overflow-y: auto;
}

.form-header {
  margin-bottom: 40px;
  
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: #0f172a;
    margin: 0 0 12px 0;
  }
  
  .form-subtitle {
    font-size: 1rem;
    color: #64748b;
    line-height: 1.5;
    margin: 0;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px 32px;
  margin-bottom: 32px;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  
  &.password-group {
    grid-column: 1 / -1;
  }
  
  label {
    font-weight: 600;
    color: #334155;
    font-size: 0.95rem;
  }
}

.password-input-wrapper {
  position: relative;
  
  :deep(.base-input) {
    width: 100%;
  }
  
  .toggle-password {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: #06b6d4;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    padding: 4px 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.field-error {
  color: #ef4444;
  font-size: 0.85rem;
  margin-top: 4px;
}

.password-requirements {
  margin-top: 16px;
  padding: 20px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  
  .requirements-title {
    font-weight: 600;
    color: #334155;
    margin-bottom: 12px;
    font-size: 0.95rem;
  }
  
  .requirements-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 10px;
    
    li {
      display: flex;
      align-items: center;
      gap: 10px;
      color: #64748b;
      font-size: 0.9rem;
      
      &.fulfilled {
        color: #10b981;
        font-weight: 500;
      }
    }
    
    .requirement-check {
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
    }
  }
}

.password-strength {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 20px;
  padding: 16px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  
  .strength-label {
    font-weight: 600;
    color: #334155;
    font-size: 0.95rem;
    white-space: nowrap;
  }
  
  .strength-indicator {
    flex: 1;
    height: 8px;
    background: #e2e8f0;
    border-radius: 4px;
    overflow: hidden;
  }
  
  .strength-bar {
    height: 100%;
    border-radius: 4px;
    width: 0%;
    transition: all 0.3s ease;
    
    &.weak {
      width: 30%;
      background: #ef4444;
    }
    
    &.medium {
      width: 60%;
      background: #f59e0b;
    }
    
    &.strong {
      width: 100%;
      background: #10b981;
    }
  }
  
  .strength-text {
    font-weight: 600;
    font-size: 0.95rem;
    min-width: 60px;
    text-align: right;
    
    .strength-bar.weak ~ & { color: #ef4444; }
    .strength-bar.medium ~ & { color: #f59e0b; }
    .strength-bar.strong ~ & { color: #10b981; }
  }
}

.terms-agreement {
  margin: 32px 0 40px;
  padding: 24px;
  background: #f8fafc;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.agreement-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  cursor: pointer;
  
  input {
    display: none;
    
    &:checked + .checkbox-custom {
      background: #06b6d4;
      border-color: #06b6d4;
      
      &::after {
        opacity: 1;
      }
    }
  }
  
  .checkbox-custom {
    width: 20px;
    height: 20px;
    border: 2px solid #cbd5e1;
    border-radius: 6px;
    position: relative;
    flex-shrink: 0;
    margin-top: 2px;
    transition: all 0.2s ease;
    
    &::after {
      content: '✓';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 12px;
      opacity: 0;
      transition: opacity 0.2s ease;
    }
  }
  
  .agreement-text {
    font-size: 0.95rem;
    color: #475569;
    line-height: 1.5;
    
    .terms-link {
      color: #06b6d4;
      font-weight: 600;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.submit-btn {
  width: 100%;
  padding: 16px;
  font-size: 1rem;
  font-weight: 600;
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(6, 182, 212, 0.3);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    box-shadow: none !important;
  }
}

.error-message {
  margin-top: 16px;
  padding: 16px;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 0.95rem;
  text-align: center;
}

.login-prompt {
  text-align: center;
  margin-top: 24px;
  color: #64748b;
  font-size: 0.95rem;
  
  .login-link {
    color: #06b6d4;
    font-weight: 600;
    text-decoration: none;
    margin-left: 8px;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

/* Responsive Design */
@media (max-width: 1024px) {
  .signup-container {
    grid-template-columns: 1fr;
    max-width: 600px;
  }
  
  .left-panel {
    display: none;
  }
  
  .right-panel {
    padding: 40px 32px;
  }
}

@media (max-width: 640px) {
  .signup-page {
    padding: 20px 16px;
  }
  
  .right-panel {
    padding: 32px 24px;
  }
  
  .form-header h2 {
    font-size: 1.75rem;
  }
  
  .form-grid {
    gap: 20px;
  }
  
  .password-requirements {
    padding: 16px;
  }
  
  .password-strength {
    padding: 12px;
  }
  
  .terms-agreement {
    padding: 20px;
  }
}
</style>