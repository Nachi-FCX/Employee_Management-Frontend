<template>
  <div class="signup-page">
    <div class="signup-container">

      <!-- Left Panel (UNCHANGED UI) -->
      <div class="left-panel">
        
        <BrandHeader subtitle="Employee Management Dashboard" />
        <div class="progress-section">
          <div class="step" :class="{ active: currentStep === 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">Root Details</div>
              <div class="step-status">Current Step</div>
            </div>
          </div>

          <div class="step" :class="{ active: currentStep === 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">Company Setup</div>
              <div class="step-status">Next Step</div>
            </div>
          </div>

          <div class="step" :class="{ active: currentStep === 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">Complete</div>
              <div class="step-status">Final Step</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="right-panel">

        <!-- ================= STEP 1 : ROOT FORM (UNCHANGED UI) ================= -->
        <form
          v-if="currentStep === 1"
          @submit.prevent="goToCompanyStep"
          class="signup-form"
        >
          <div class="form-header">
            <h2>Root Registration</h2>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <BaseInput
                label="Full Name"
                v-model="fullName"
                v-bind="fullNameProps"
                :error="errors.fullName"
                placeholder="Enter Full Name"
              />
            </div>

            <div class="form-group">
              <BaseInput
                label="Username"
                v-model="username"
                v-bind="usernameProps"
                placeholder="Root username"
                :error="errors.username"
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="email"
                v-bind="emailProps"
                label="Email Address"
                placeholder="root@company.com"
                :error="errors.email"
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="phone"
                v-bind="phoneProps"
                label="Phone Number"
                placeholder="+91..."
                :error="errors.phone"
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="password"
                v-bind="passwordProps"
                label="Password"
                type="password"
                placeholder="Create a strong password"
                :error="errors.password"
              />
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
          <label class="terms-inline">
  <input
    type="checkbox"
    v-model="agreementAccepted"
    class="terms-checkbox"
  />
  <span>I agree to the Terms of Service</span>
</label>

            <div v-if="errors.agreementAccepted" class="field-error">
              <i class="icon-warning"></i> You must accept the terms to continue
            </div>

          <BaseButton type="submit" class="submit-btn">
            Continue
          </BaseButton>
           <!-- Login Link -->
          <div class="login-prompt">
            Already have an admin account?
            <NuxtLink to="/login" class="login-link">Sign in here</NuxtLink>
          </div>
        </form>

        <!STEP 2 : COMPANY FORM (SAME CLASSES)>
        <form
          v-if="currentStep === 2"
          @submit.prevent="submitWithCompany"
          class="signup-form"
        >
          <div class="form-header">
            <h2>Company Setup</h2>
            <p class="form-subtitle">
              You can complete this now or skip and do it later
            </p>
          </div>

          <div class="form-grid">
            <div class="form-group">
              <BaseInput
                label="Company Name"
                v-model="companyName"
                v-bind="companyNameProps"
                placeholder="Company Name"
                :error="companyErrors.companyName"
              />
            </div>

            <div class="form-group">
              <BaseInput
                label="Company Email"
                v-model="companyEmail"
                v-bind="companyEmailProps"
                placeholder="Company Email ID"
                :error="companyErrors.companyEmail"
            />
            </div>

            <div class="form-group">
              <BaseInput
                label="Industry"
                v-model="industry"
                v-bind="industryProps"
                placeholder = "Industry" 
                :error="companyErrors.industry"
              />
            </div>
          </div>

          <BaseButton type="submit" class="submit-btn">
            Complete Signup
          </BaseButton>


           <!-- Skip company form link -->
          <div class="login-prompt">
            
            <NuxtLink to="/signup" class="login-link">Skip for now</NuxtLink>
          </div>
        </form>

        <!-- ================= STEP 3 : COMPLETE ================= -->
        <div v-if="currentStep === 3" class="signup-form">
          <div class="form-header">
            <h2>Signup Completed</h2>
            <p class="form-subtitle">
              You can complete company setup later from your dashboard
            </p>
          </div>

          <NuxtLink to="/login" class="submit-btn">
            Go to Login
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const currentStep = ref<1 | 2 | 3>(1)
const rootPayload = ref<any>(null)

const {
  companyName,
  companyNameProps,
  companyEmail,
  companyEmailProps,
  industry,
  industryProps,
  errors: companyErrors,
  validateCompanyForm
} = useCompanyForm()

const {
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
  errors,
  validateRootForm
} = useSignupForm()


async function goToCompanyStep() {
  const payload = await validateRootForm()
  if (!payload) return

  rootPayload.value = payload
  currentStep.value = 2
}

async function submitWithCompany() {
  const companyPayload = await validateCompanyForm()
  if (!companyPayload) return

  await authService.signupRoot(rootPayload.value)
  await companyService.setupCompany(companyPayload)

  currentStep.value = 3
}

async function skipCompany() {
  await authService.signupRoot(rootPayload.value)
  currentStep.value = 3
}
</script>
