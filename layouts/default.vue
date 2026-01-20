<template>
  <Navbar v-if="showNav" />
  <NuxtPage />
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from '#imports'

const route = useRoute()
const showNav = computed(() => {
  // hide navbar on the login page
  return route.path !== '/login' && route.name !== 'login'
})
</script>
