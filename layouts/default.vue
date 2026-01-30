<template>
  <div class="layout-wrapper">
    
    <Navbar v-if="showNav" />

    
    <div class="layout-content">
      
      <Sidebar />

      
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from '#imports'
import Navbar from '~/components/layout/Navbar.vue'
import Sidebar from '~/components/layout/Sidebar.vue'

const route = useRoute()

const showNav = computed(() => {
  return route.path !== '/login' && route.path !== '/signup'
})
</script>

<style scoped>

.layout-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f9fafb; 
  overflow: hidden;
}


.layout-content {
  display: flex;
  flex: 1;
  /* padding-top: 60px; */
    /* position: fixed; */
  min-height: 0;
}


.main-content {
      /* flex: 1; */
    /* margin: auto; */
    padding: 24px;
  overflow: auto;
    background-color: #f9fafb;
  display: flex;
  flex: 1;
  min-width: 0;
    /* width: 100vw; */
}
</style>
