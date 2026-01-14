<template>
  <div class="login-page">
    <div class="login-card">
      <div class="login-brand">
        <div class="brand-info">
          <h1>Fincorpx</h1>
          <p class="brand-sub">Employee Management Dashboard</p>
        </div>
      </div>

      <form @submit.prevent="submit" class="login-form">
        <h2 class="title">Sign in to your account</h2>
        <p class="subtitle">Enter your credentials to access the dashboard</p>

        <BaseInput
          v-model="username"
          label="Username"
          placeholder="Username"
          type="text"
        />

        <BaseInput
          v-model="password"
          label="Password"
          placeholder="Password"
          type="password"
        />

        <BaseButton :loading="loading">
          Sign in
        </BaseButton>

        <p v-if="error" class="error-msg">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRoute } from '#imports'


const username = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

const auth = useAuthStore()
const route = useRoute()

const submit = async () => {
  error.value = ''
  loading.value = true

  try {
    await auth.login(username.value, password.value)
    // store handles redirect to /dashboard
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Login failed'
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
  padding: 40px;
  background: linear-gradient(180deg, #f5f9fb 0%, #f2f7f4 100%);
}

.login-card {
  width: 100%;
  max-width: 440px;
  background: #ffffff;
  border-radius: 14px;
  padding: 32px;
  box-shadow: 0 18px 40px rgba(16, 24, 40, 0.08);
  border: 1px solid rgba(15, 23, 42, 0.04);
}

.login-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 8px;
}

.brand-mark {
  width: 56px;
  height: 56px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #10b981, #06b6d4);
  color: #fff;
  font-weight: 700;
  font-size: 1.05rem;
}

.brand-info h1 {
  margin: 0;
  font-size: 1.15rem;
  color: #0f172a;
}

.brand-sub {
  margin: 0;
  color: #64748b;
  font-size: 0.85rem;
}

.title {
  margin: 6px 0 0 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.subtitle {
  margin: 6px 0 18px 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Style inputs inside the form (BaseInput renders an input) */
.login-form input {
  border-radius: 10px;
  border: 1.5px solid #e6eef0;
  padding: 12px 14px;
  font-size: 0.98rem;
  color: #0f172a;
}

.login-form input:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 6px 18px rgba(6, 182, 212, 0.08);
}

/* Make the primary button full width and prominent */
.login-form button {
  width: 100%;
  background: linear-gradient(90deg, #06b6d4, #10b981);
  color: #ffffff;
  padding: 12px 16px;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1rem;
  border: none;
}

.login-form button:hover {
  filter: brightness(0.98);
}

.error-msg {
  color: #dc2626;
  margin-top: 8px;
  font-weight: 600;
  background: rgba(220, 38, 38, 0.05);
  padding: 8px 10px;
  border-radius: 8px;
}

@media (max-width: 480px) {
  .login-card {
    padding: 20px;
    border-radius: 12px;
  }

  .brand-mark { width:48px; height:48px; }
}
</style>
