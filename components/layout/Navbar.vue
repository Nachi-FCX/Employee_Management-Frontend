<template>
  <nav v-if="showNavbar" class="navbar">
    <div class="nav-left">
      <NuxtLink to="/" class="brand">Fincorpx</NuxtLink>
    </div>

    <div class="nav-right">
      <div v-if="user" class="user-info">
        <span class="username">{{ user.username }}</span>
      </div>
      <button
        v-if="loggedIn"
        class="btn-logout"
        @click="handleLogout"
      >
        Logout
      </button>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useRoute, navigateTo } from '#imports'

const auth = useAuthStore()
const route = useRoute()

const user = computed(() => auth.user)
const loggedIn = computed(() => auth.loggedIn)

/**
 * Hide navbar on login & signup pages
 */
const showNavbar = computed(() => {
  const hiddenRoutes = ['/login', '/signup']
  return !hiddenRoutes.includes(route.path)
})

function handleLogout() {
  auth.logout()
  if (process.client) navigateTo('/login')
}
</script>

<style scoped>
.navbar {
  height: 64px;
  background-color: #0f172a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 6px 18px rgba(2,6,23,0.08);
}

.brand {
  color: #06b6d4;
  font-weight: 700;
  text-decoration: none;
  font-size: 1rem;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.username {
  color: #cbd5e1;
  font-weight: 600;
}

.btn-logout {
  background: transparent;
  border: 1px solid rgba(255,255,255,0.12);
  color: #fff;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
}

.btn-logout:hover {
  background: rgba(255,255,255,0.03);
}
</style>
