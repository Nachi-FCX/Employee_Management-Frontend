<template>
  <nav v-if="showNavbar" class="navbar">
    
    <div class="nav-left">
      <NuxtLink to="/" class="brand">Fincorpx</NuxtLink>
    </div>

    
    <div class="nav-center">
      <div class="search-box">
        <i class="pi pi-search"></i>
        <input 
          v-model="searchQuery" 
          placeholder="Search" 
          @keyup.enter="handleSearch"
          @input="console.log('Typing:', searchQuery)"
        />
      </div>
    </div>

    
    <div class="nav-right">
      
      <button class="attendance-btn" @click="openAttendanceDialog">
        <i class="pi pi-calendar-clock"></i>
        <span>Attendance</span>
      </button>

      
      <div class="avatar">U</div>
    </div>

    
    <Dialog
      v-model:visible="showAttendanceDialog"
      modal
      header="Attendance"
      :style="{ width: '320px' }"
    >
      <div class="attendance-content">
        <p class="date">{{ today }}</p>

        
        <div class="toggle-row">
          <span>Status</span>
          <ToggleSwitch
            v-model="checkedIn"
            @change="handleToggle"
          />
        </div>

        
        <p class="status" v-if="checkedIn">
          🟢 Checked in at {{ checkInTime }}
        </p>
        <p class="status off" v-else>
          🔴 Not checked in
        </p>
      </div>
    </Dialog>

    
    <Dialog
      v-model:visible="showConfirmDialog"
      modal
      header="Confirm Checkout"
      :style="{ width: '300px' }"
    >
      <p>Are you sure you want to check out?</p>

      <div class="confirm-actions">
        <Button
          label="Cancel"
          severity="secondary"
          @click="cancelCheckout"
        />
        <Button
          label="Confirm"
          severity="danger"
          @click="confirmCheckout"
        />
      </div>
    </Dialog>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from '#imports'
import Dialog from 'primevue/dialog'
import ToggleSwitch from 'primevue/toggleswitch'
import Button from 'primevue/button'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '~/stores/auth'
import { useAttendanceService } from '~/services/attendance.service'

const route = useRoute()

const showNavbar = computed(() => {
  return !['/login', '/signup'].includes(route.path)
})

const auth = useAuthStore()
const { user } = storeToRefs(auth)
const { checkIn, checkOut } = useAttendanceService()

const employeeId = computed(() => user.value?.employeeId ?? null)
const companyId = computed(() => user.value?.companyId ?? null)

// Search State
const searchQuery = ref('')

function handleSearch() {
  console.log('🔍 Search triggered!')
  console.log('Search query:', searchQuery.value)
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
  }
}

// Attendance State
const showAttendanceDialog = ref(false)
const showConfirmDialog = ref(false)

const checkedIn = ref(false)
const checkInTime = ref('')

const today = new Date().toDateString()

async function handleToggle() {
  if (checkedIn.value) {
    if (!employeeId.value || !companyId.value) {
      checkedIn.value = false
      console.warn('Missing employee or company id for check-in.')
      return
    }

    try {
      const res = await checkIn(employeeId.value, companyId.value)
      checkInTime.value =
        res?.data?.check_in_time ?? new Date().toLocaleTimeString()
      showAttendanceDialog.value = false
    } catch (error) {
      checkedIn.value = false
      const status = (error as any)?.response?.status
      const message = (error as any)?.response?.data
      if (status === 409) {
        alert(
          typeof message === 'string'
            ? message
            : 'You have already checked out today.'
        )
        return
      }
      console.error('Check-in failed:', error)
    }
  } else {
    showConfirmDialog.value = true
  }
}

function cancelCheckout() {
  checkedIn.value = true
  showConfirmDialog.value = false
}

async function confirmCheckout() {
  if (!employeeId.value || !companyId.value) {
    checkedIn.value = true
    console.warn('Missing employee or company id for check-out.')
    return
  }

  try {
    await checkOut(employeeId.value, companyId.value)
    checkedIn.value = false
    checkInTime.value = ''
    showConfirmDialog.value = false
    showAttendanceDialog.value = false
  } catch (error) {
    checkedIn.value = true
    console.error('Check-out failed:', error)
  }
}

function openAttendanceDialog() {
  console.log('🔔 Attendance button clicked!')
  showAttendanceDialog.value = true
  console.log('Dialog state:', showAttendanceDialog.value)
}
</script>

<style scoped>

.navbar {
  height: 60px;
  background-color: #ffffff;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
      width: 100vw;
    /* position: fixed; */
}

.brand {
  font-size: 1.3rem;
  font-weight: 700;
  color: #2563eb;
  text-decoration: none;
}


.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.search-box {
  display: flex;
  align-items: center;
  background: #f3f4f6;
  padding: 6px 15px;
  border-radius: 800px;
  width: 320px;
  gap: 10px;
 
}
 .pi-search{
font-size: 13px;
    color: grey;
  }
.search-box input {
  border: none;
  background: transparent;
  outline: none;
  font-size: 14px;
  flex: 1;
  padding: 4px 6px;
}


.nav-right {
  display: flex;
  align-items: center;
  gap: 16px;
}


.attendance-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #eef2ff;
  color: #374151;
  border: none;
  padding: 3px 13px;
  border-radius: 999px;
  cursor: pointer;
  font-weight: 500;
}

.attendance-content {
  display: flex;
  flex-direction: column;
  gap: 14px;
}


.date {
  font-size: 13px;
  color: #6b7280;
}

.toggle-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status {
  font-size: 14px;
  font-weight: 500;
}

.status.off {
  color: #dc2626;
}


.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}


.avatar {
  width: 36px;
  height: 36px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}
</style>
