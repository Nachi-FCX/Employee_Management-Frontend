<template>
  <div class="login-page">
    <BackgroundDecoration />
    <div class="login-card">
      <BrandHeader subtitle="Employee Management Dashboard" />
      <PageHeader title="Welcome Back" subtitle="Enter your credentials to access your dashboard" />
      
      <form @submit.prevent="handleLogin" class="login-form">
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


<script setup lang="ts">
const { 
  username, usernameProps, password, passwordProps, 
  rememberMe, serverError, showPassword, 
  isSubmitting, errors, handleLogin, togglePassword 
} = useLoginForm();
</script>

