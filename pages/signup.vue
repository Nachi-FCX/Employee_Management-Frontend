<template>
  <div class="signup-page">
    <div class="signup-container">
     <!-- Left Panel - Brand & Info -->
      <div class="left-panel">
        <div class="brand-section">
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

      <div class="right-panel">
        <div class="form-header">
          <h2>Admin Registration</h2>
          <p class="form-subtitle">Create an admin account to access the dashboard</p>
        </div>

        <form @submit.prevent="handleSignup" class="signup-form">
          <div class="form-grid">
            <div class="form-group">
              <BaseInput
                label="Username"
                v-model="username"
                v-bind="usernameProps"
                placeholder="Admin username"
                :error="errors.username"
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="email"
                v-bind="emailProps"
                label="Email Address"
                placeholder="admin@fincorpx.com"
                :error="errors.email"
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="phone"
                v-bind="phoneProps"
                label="Phone Number"
                placeholder="+1..."
                :error="errors.phone"
              />
            </div>

            <div class="form-group password-group">
              <BaseInput
                v-model="password"
                v-bind="passwordProps"
                label="Password"
                type="password"
                placeholder="Create a strong password"
                :error="errors.password"
              />
              
              <div class="password-requirements">
                <div class="requirements-title">Password must contain:</div>
                <ul class="requirements-list">
                  <li :class="{ fulfilled: passwordStatus.hasMinLength }">
                    <span class="requirement-check">{{ passwordStatus.hasMinLength ? '✓' : '○' }}</span>
                    At least 8 characters
                  </li>
                  <li :class="{ fulfilled: passwordStatus.hasUppercase }">
                    <span class="requirement-check">{{ passwordStatus.hasUppercase ? '✓' : '○' }}</span>
                    One uppercase letter
                  </li>
                  <li :class="{ fulfilled: passwordStatus.hasSpecial }">
                    <span class="requirement-check">{{ passwordStatus.hasSpecial ? '✓' : '○' }}</span>
                    One special character
                  </li>
                </ul>
              </div>

              <div class="password-strength">
                <div class="strength-label">Strength:</div>
                <div class="strength-indicator">
                  <div class="strength-bar" :class="passwordStrengthClass"></div>
                </div>
                <div class="strength-text">{{ passwordStrengthText }}</div>
              </div>
            </div>

            <div class="form-group">
              <BaseInput
                v-model="confirmPassword"
                v-bind="confirmPasswordProps"
                label="Confirm Password"
                type="password"
                placeholder="Repeat password"
                :error="errors.confirmPassword"
              />
            </div>
          </div>

          <div class="terms-agreement">
            <label class="agreement-checkbox">
              <input type="checkbox" v-model="agreementAccepted" />
              <span class="checkbox-custom"></span>
              <span class="agreement-text">
                I acknowledge and agree to the 
                <a href="#" class="terms-link">Terms of Service</a>.
              </span>
            </label>
            <div v-if="errors.agreementAccepted" class="field-error">You must accept the terms</div>
          </div>

          <BaseButton 
            :loading="isSubmitting" 
            type="submit" 
            class="submit-btn"
          >
            Create Admin Account
          </BaseButton>
          <!-- Login Link -->
          <div class="login-prompt">
            Already have an admin account?
            <NuxtLink to="/login" class="login-link">Sign in here</NuxtLink>
          </div>

          <div v-if="submitError" class="error-message">{{ submitError }}</div>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
const { 
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
  submitError,
  isSubmitting,
  errors,
  handleSignup
} = useSignupForm();
</script>

