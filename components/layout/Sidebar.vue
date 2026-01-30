<template>
  <div
    v-if="showSidebar"
    :class="['sidebar', { collapsed: isCollapsed }]"
  >
    <!-- Menu -->
    <nav class="menu">
      <div
        class="menu-item"
        :class="{ active: route.path === '/dashboard' }"
        @click="navigateTo('/dashboard')"
      >
        <i class="pi pi-home"></i>
        <span v-if="!isCollapsed">Dashboard</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: route.path === '/employees' }"
        @click="navigateTo('/employees')"
      >
        <i class="pi pi-users"></i>
        <span v-if="!isCollapsed">Employees</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: route.path === '/createemployees' }"
        @click="navigateTo('/createemployees')"
      >
        <i class="pi pi-user-plus"></i>
        <span v-if="!isCollapsed">Add Employee</span>
      </div>

      <div
        class="menu-item"
        :class="{ active: route.path === '/attendance' }"
        @click="navigateTo('/attendance')"
      >
        <i class="pi pi-calendar-clock"></i>
        <span v-if="!isCollapsed">Attendance</span>
      </div>
    </nav>

    <button class="collapse-btn" @click="toggleSidebar">
      <i
        :class="[
          'pi',
          isCollapsed ? 'pi-angle-right' : 'pi-angle-left'
        ]"
      ></i>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, navigateTo } from '#imports'

const route = useRoute()
const isCollapsed = ref(false)

const showSidebar = computed(() => {
  return !['/login', '/signup'].includes(route.path)
})

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}
</script>

<style scoped>

.sidebar {
  display: flex;
  flex-direction: column;
  z-index: 100000;
  width: 240px;
  background-color: #ffffff;
  border-right: 1px solid #e5e7eb;
  height: calc(100vh - 64px); 
  padding: 0px;   
  transition: width 0.25s ease;
}

menu
 {
    background-color: #fff;
    padding: 0rem;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
}
.sidebar.collapsed {
  width: 64px;
}


.sidebar .menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 0px;
  flex: 1;
}


.menu-item {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  color: #374151;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}


.menu-item i {
  width: 20px;
  font-size: 18px;
  margin-right: 14px;
  color: inherit;
}


.menu-item:hover {
  background-color: #f3f4f6;
  color: #2563eb;
}


.menu-item.active {
  background-color: #eef2ff;
  color: #2563eb;
}


.sidebar.collapsed .menu-item {
  justify-content: center;
  /* padding: 12px 0; */
}

.sidebar.collapsed .menu-item i {
  margin-right: 0;
}


.collapse-btn {
  align-self: flex-end;
  margin: 0 16px 16px 0;

  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #134bbd;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  z-index: 10;
}


.collapse-btn:hover {
  background-color: #0c48c0;
}
</style>
