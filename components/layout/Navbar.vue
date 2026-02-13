<template>
  <nav v-if="showNavbar" class="navbar">
    
    <div class="nav-left">
      <NuxtLink to="/landing" class="brand">Fincorpx</NuxtLink>
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
        <span>{{ checkedIn ? 'Checked In' : 'Checked Out' }}</span>
      </button>

      
      <div class="avatar-container" ref="avatarContainer">
        <div class="avatar" @click="toggleProfileDropdown">U</div>
        <div v-if="showProfileDropdown" class="profile-dropdown">
          <button class="dropdown-item" @click="goToProfile">
            <i class="pi pi-user"></i>
            <span>Profile</span>
          </button>
          <button class="dropdown-item" @click="goToCompany">
            <i class="pi pi-building"></i>
            <span>Company</span>
          </button>
         
          <div class="dropdown-divider"></div>
          <button class="dropdown-item logout" @click="handleLogout">
            <i class="pi pi-sign-out"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Profile Side Panel -->
    <ProfileSidePanel
      :isOpen="showProfilePanel"
      @close="showProfilePanel = false"
    />

    <CompanySidePanel
      :isOpen="showCompanyPanel"
      @close="showCompanyPanel = false"
    />

    
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
            @update:modelValue="handleToggle"
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
import { useRoute, navigateTo } from '#imports'
import Dialog from 'primevue/dialog'
import ToggleSwitch from 'primevue/toggleswitch'
import Button from 'primevue/button'
import ProfileSidePanel from '~/components/ProfileSidePanel.vue'
import CompanySidePanel from '~/components/CompanySidePanel.vue'
import { useAuthStore } from '~/stores/auth'
import { useAttendanceService } from '~/services/attendance.service'

const route = useRoute()

const showNavbar = computed(() => {
  return !['/login', '/signup'].includes(route.path)
})

const auth = useAuthStore()
const { checkIn, checkOut } = useAttendanceService()

/* ================================
   🔐 JWT DECODE 
================================ */

function decodeToken(jwt: string) {
  try {
    const payload = jwt.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

const decodedToken = ref<any>(null)

if (process.client) {
  const token = localStorage.getItem('token')
  if (token) {
    decodedToken.value = decodeToken(token)
    console.log('Decoded JWT:', decodedToken.value)
  }
}

const employeeId = computed(() => decodedToken.value?.employee_id ?? null)
const companyId = computed(() => decodedToken.value?.company_id ?? null)

/* ================================
   PROFILE DROPDOWN
================================ */

const showProfileDropdown = ref(false)
const showProfilePanel = ref(false)
const showCompanyPanel = ref(false)
const avatarContainer = ref<HTMLElement>()

function toggleProfileDropdown() {
  showProfileDropdown.value = !showProfileDropdown.value
}

function closeProfileDropdown() {
  showProfileDropdown.value = false
}

function goToProfile() {
  showProfilePanel.value = true
  showCompanyPanel.value = false
  closeProfileDropdown()
}

function goToCompany() {
  showCompanyPanel.value = true
  showProfilePanel.value = false
  closeProfileDropdown()
}

function handleLogout() {
  auth.logout()
  navigateTo('/login')
  closeProfileDropdown()
}

if (process.client) {
  document.addEventListener('click', (event) => {
    if (avatarContainer.value && !avatarContainer.value.contains(event.target as Node)) {
      closeProfileDropdown()
    }
  })
}

/* ================================
   SEARCH
================================ */

const searchQuery = ref('')

function handleSearch() {
  if (searchQuery.value.trim()) {
    console.log('Searching for:', searchQuery.value)
  }
}

/* ================================
   ATTENDANCE LOGIC
================================ */

const showAttendanceDialog = ref(false)
const showConfirmDialog = ref(false)

const checkedIn = ref(false)
const checkInTime = ref('')

const today = new Date().toDateString()

async function handleToggle(newValue: boolean) {
  console.log('🔔 Toggle changed to:', newValue)

  if (!employeeId.value || !companyId.value) {
    checkedIn.value = false
    alert('Missing employee or company information')
    return
  }

  if (newValue) {
    // ✅ CHECK IN
    try {
      const res = await checkIn(employeeId.value, companyId.value)
      checkInTime.value =
        res?.data?.check_in_time ?? new Date().toLocaleTimeString()

      showAttendanceDialog.value = false
    } catch (error: any) {
      checkedIn.value = false

      if (error?.response?.status === 409) {
        alert(
          typeof error?.response?.data === 'string'
            ? error.response.data
            : 'You have already checked out today.'
        )
        return
      }

      alert('Check-in failed. Please try again.')
    }
  } else {
    // ✅ CHECK OUT (confirm dialog)
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
    alert('Missing employee or company information')
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
    alert('Check-out failed. Please try again.')
  }
}

function openAttendanceDialog() {
  showAttendanceDialog.value = true
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
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.avatar:hover {
  background-color: #1d4ed8;
}

.avatar-container {
  position: relative;
}

.profile-dropdown {
  position: absolute;
  top: 45px;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 200px;
  z-index: 1000;
  overflow: hidden;
}

.dropdown-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  transition: background-color 0.2s ease;
  text-align: left;
}

.dropdown-item:hover {
  background-color: #f3f4f6;
}

.dropdown-item i {
  font-size: 16px;
  color: #6b7280;
}

.dropdown-item.logout {
  color: #dc2626;
}

.dropdown-item.logout i {
  color: #dc2626;
}

.dropdown-item.logout:hover {
  background-color: #fee2e2;
}

.dropdown-divider {
  height: 1px;
  background-color: #e5e7eb;
  margin: 4px 0;
}
</style>
