<template>
  <div class="login-page">
    <BackgroundDecoration />

    <div class="login-card">
      <BrandHeader subtitle="Employee Management Dashboard" />
      <PageHeader
        title="Welcome Back"
        subtitle="Enter your credentials to access your dashboard"
      />

      <form @submit.prevent="handleLogin" class="login-form">

        <!-- LOGIN TYPE SWITCH -->
        <div class="login-type-switch">
          <label
            class="login-type-option"
            :class="{ selected: loginType === 'root' }"
          >
            <input
              type="radio"
              value="root"
              v-model="loginType"
              name="loginType"
            />
            <div class="option-content">
              <div class="option-text">
                <span class="title">Root</span>
                <span class="desc">Account owner</span>
              </div>
            </div>
          </label>

          <label
            class="login-type-option"
            :class="{ selected: loginType === 'employee' }"
          >
            <input
              type="radio"
              value="employee"
              v-model="loginType"
              name="loginType"
            />
            <div class="option-content">
              <div class="option-text">
                <span class="title">Employee</span>
                <span class="desc">Daily access user</span>
              </div>
            </div>
          </label>
        </div>

        <!-- USERNAME -->
        <div class="input-group">
          <BaseInput
            v-model="username"
            v-bind="usernameProps"
            :label="loginType === 'root' ? 'Root Email' : 'Username'"
            :placeholder="
              loginType === 'root'
                ? 'admin@company.com'
                : 'Enter your username'
            "
            :error="errors.username"
          />
        </div>

        <!-- PASSWORD -->
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

        <!-- REMEMBER / FORGOT -->
        <div class="form-row">
          <label class="remember-me-label">
            <input type="checkbox" v-model="rememberMe" />
            <span>Remember me</span>
          </label>

          <NuxtLink to="/forgot-password" class="forgot-link">
            Forgot password?
          </NuxtLink>
        </div>

        <!-- SUBMIT -->
        <BaseButton
          :loading="isSubmitting"
          type="submit"
          class="submit-btn"
        >
          Sign In
        </BaseButton>

        <!-- SIGNUP -->
        <p class="signup-text">
          Don't have an account?
          <NuxtLink to="/signup" class="signup-link">
            Create account
          </NuxtLink>
        </p>

        <!-- ERROR -->
        <transition name="fade">
          <div v-if="serverError" class="server-error-msg">
            {{ serverError }}
          </div>
        </transition>

      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLoginForm } from '~/composables/useAuthForms'

const loginType = ref<'root' | 'employee'>('employee')

const {
  username,
  usernameProps,
  password,
  passwordProps,
  rememberMe,
  serverError,
  showPassword,
  isSubmitting,
  errors,
  handleLogin
} = useLoginForm(loginType)
</script>

<style scoped>
/* LOGIN TYPE SWITCH */
.login-type-switch {
  display: flex;
  gap: 28px;
  margin: 20px 0 24px;
}

.login-type-option {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid transparent;
  transition: background 0.2s ease, border 0.2s ease;
  flex: 1;
  position: relative;
}

/* Hide radio input */
.login-type-option input[type="radio"] {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

/* Custom radio circle */
.login-type-option::before {
  content: '';
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #cbd5e1;
  background: #fff;
  transition: all 0.2s ease;
}

/* Hover */
.login-type-option:hover {
  background: #f5f9ff;
}

/* Selected state */
.login-type-option.selected {
  background: #f0f9ff;
  border-color: #0ea5e9;
}

.login-type-option.selected::before {
  background: #0ea5e9;
  border-color: #0ea5e9;
  box-shadow: inset 0 0 0 4px white;
}

/* Text */
.option-text {
  display: flex;
  flex-direction: column;
}

.option-text .title {
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
}

.option-text .desc {
  font-size: 12px;
  color: #64748b;
  margin-top: 2px;
}

.login-type-option.selected .title {
  color: #0ea5e9;
}

/* Mobile */
@media (max-width: 640px) {
  .login-type-switch {
    flex-direction: column;
    gap: 12px;
  }
}
</style>
