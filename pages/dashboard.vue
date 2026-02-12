<template>
  <div class="dashboard-page">
    <div class="header">
      <h1>Dashboard</h1>
    </div>

    <section class="card">
      <p><strong>User:</strong> {{ user?.username ?? '—' }}</p>
      <p><strong>Role:</strong> {{ user?.role ?? '—' }}</p>

      <div class="welcome">
        <h2>Welcome to the Employee Management Dashboard</h2>
        <p>This is a placeholder page shown after a successful login.</p>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">


import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
const user = computed(() => auth.user)

function logout() {
  auth.logout()
}
</script>

<style scoped>
.dashboard-page {
  padding: 28px;
  max-width: 900px;
  margin: 40px auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;
}

.header h1 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.signout {
  background: transparent;
  border: 1px solid #e6eef0;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.card {
  background: #fff;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 12px 30px rgba(16,24,40,0.06);
  border: 1px solid rgba(15,23,42,0.04);
}

.welcome h2 {
  margin: 0 0 8px 0;
}

.welcome p {
  color: #475569;
}
</style>