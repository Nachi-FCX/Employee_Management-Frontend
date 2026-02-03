<template>
  <div class="signup-page">
    <div class="signup-container">

      <!-- Left Panel -->
      <div class="left-panel">
        <BrandHeader subtitle="Employee Management Dashboard" />

        <div class="progress-section">
          <div class="step" :class="{ active: currentStep === 1 }">
            <div class="step-number">1</div>
            <div class="step-content">
              <div class="step-title">Root Details</div>
            </div>
          </div>

          <div class="step" :class="{ active: currentStep === 2 }">
            <div class="step-number">2</div>
            <div class="step-content">
              <div class="step-title">Company Setup</div>
            </div>
          </div>

          <div class="step" :class="{ active: currentStep === 3 }">
            <div class="step-number">3</div>
            <div class="step-content">
              <div class="step-title">Complete</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="right-panel">

        <!-- STEP 1 -->
        <form
          v-if="currentStep === 1"
          @submit.prevent="goToCompanyStep"
          class="signup-form"
        >
   

          
          <div class="form-grid">
            <div class="form-group">
              <BaseInput
                label="Full Name"
                v-model="fullName"
                v-bind="fullNameProps"
                :error="errors.fullName"
                useIftaLabel
              />
            </div>

            <div class="form-group">
              <BaseInput
                label="Username"
                v-model="username"
                v-bind="usernameProps"
                :error="errors.username"
                useIftaLabel
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="email"
                v-bind="emailProps"
                label="Email Address"
                :error="errors.email"
                useIftaLabel
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="phone"
                v-bind="phoneProps"
                label="Phone Number"
                :error="errors.phone"
                useIftaLabel
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="password"
                v-bind="passwordProps"
                label="Password"
                type="password"
                :error="errors.password"
                useIftaLabel
              />
            </div>

            <div class="form-group">
              <BaseInput
                v-model="confirmPassword"
                v-bind="confirmPasswordProps"
                label="Confirm Password"
                type="password"
                :error="errors.confirmPassword"
                useIftaLabel
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
        <!-- STEP 2 -->
<form
  v-if="currentStep === 2"
  @submit.prevent="submitWithCompany"
  class="signup-form"
>
  <h2>Company Setup</h2>

  <div class="form-grid">
    <div class="form-group">
      <BaseInput
        label="Company Name"
        v-model="companyName"
        v-bind="companyNameProps"
        :error="companyErrors.companyName"
        useIftaLabel
      />
    </div>

    <div class="form-group">
      <BaseInput
        label="Company Email"
        v-model="companyEmail"
        v-bind="companyEmailProps"
        :error="companyErrors.companyEmail"
        useIftaLabel
      />
    </div>

    <div class="form-group">
      <BaseInput
        label="Industry"
        v-model="industry"
        v-bind="industryProps"
        :error="companyErrors.industry"
        useIftaLabel
      />
    </div>
  </div>

  <!-- Buttons -->
  <BaseButton type="submit" class="submit-btn">
    Complete Signup
  </BaseButton>

  <!-- ✅ SKIP BUTTON -->
  <div class="login-prompt">
    <a href="#" class="login-link" @click.prevent="skipCompany">
      Skip for now
    </a>
  </div>
</form>


        <!-- STEP 3 -->
        <div v-if="currentStep === 3" class="signup-form">
          <h2>Signup Completed</h2>
          <p>You are now logged in</p>

          <NuxtLink to="/dashboard" class="submit-btn">
            Go to Dashboard
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { authService } from '~/services/auth.service'
import { companyService } from '~/services/company.service'
import { navigateTo } from '#imports'

const authStore = useAuthStore()
const currentStep = ref<1 | 2 | 3>(1)
const rootPayload = ref<any>(null)

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

async function goToCompanyStep() {
  const payload = await validateRootForm()
  if (!payload) return

  rootPayload.value = payload
  currentStep.value = 2
}

async function submitWithCompany() {
  try {
    // 1️⃣ Signup (this WORKS)
    const signupPayload = {
      full_name: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      phone: phone.value || null
    }

    console.log('Signup payload:', signupPayload)

    const res = await authService.signupRoot(signupPayload)

    // ✅ Signup success
    authStore.setToken(res.token)
    authStore.user = {
      username: signupPayload.username,
      role: 'ROOT',
      companyCompleted: false
    }

    // 2️⃣ Company setup (FIX PAYLOAD)
    const companyPayload = {
      company_name: companyName.value,
      company_code: companyName.value.toUpperCase().slice(0, 6), // or from input
      contact_email: companyEmail.value,
      industry: industry.value
    }

    console.log('Company payload:', companyPayload)

    try {
      await companyService.setupCompany(companyPayload)
      authStore.user.companyCompleted = true
    } catch (companyErr: any) {
      console.warn(
        'Company setup failed (signup still OK):',
        companyErr.message
      )
    }

    // 3️⃣ Always navigate
    await navigateTo('/dashboard')

  } catch (err: any) {
    // ❌ ONLY signup failure reaches here
    console.error('Signup error:', err.message)
    alert(err.message)
  }
}



async function skipCompany() {
  try {
    const signupPayload = {
      full_name: fullName.value,
      username: username.value,
      email: email.value,
      password: password.value,
      phone: phone.value || null
    }

    const res = await authService.signupRoot(signupPayload)
    if (!res?.token) throw new Error('Signup failed')

    authStore.setToken(res.token)
    authStore.user = {
      username: signupPayload.username,
      role: 'root',
      companyCompleted: false
    }

    await navigateTo('/dashboard')
  } catch (err: any) {
    console.error('Signup failed:', err.message)
    alert(err.message)
  }
}


</script>
