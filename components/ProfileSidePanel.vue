<template>
  <!-- Backdrop -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="sidebar-backdrop"
      @click="closePanel"
    ></div>
  </Transition>

  <!-- Side Panel -->
  <Transition name="slide">
    <div v-if="isOpen" class="profile-side-panel">
      <!-- Header -->
      <div class="panel-header">
        <div class="panel-title">
          <button
            v-if="panelView !== 'profile'"
            class="back-btn"
            @click="setPanelView('profile')"
          >
            <i class="pi pi-arrow-left"></i>
          </button>
          <h2>{{ panelTitle }}</h2>
        </div>
        <button class="close-btn" @click="closePanel">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <!-- Content -->
      <div class="panel-content">
        <template v-if="panelView === 'profile'">
          <!-- Avatar Section -->
          <div class="avatar-section">
            <div class="avatar-large">{{ initials }}</div>
            <h3 class="username">{{ user?.username || 'User' }}</h3>
            <p class="role">{{ user?.role === 'root' ? 'Admin' : 'Employee' }}</p>
          </div>

          <!-- Info Section -->
          <div class="info-section">
            <div class="info-group">
              <label>Username</label>
              <p>{{ user?.username || 'N/A' }}</p>
            </div>

            <div class="info-group">
              <label>Role</label>
              <p>{{ user?.role === 'root' ? 'Administrator' : 'Employee' }}</p>
            </div>

            <div class="info-group" v-if="user?.employeeId">
              <label>Employee ID</label>
              <p>{{ user.employeeId }}</p>
            </div>

            <div class="info-group" v-if="user?.companyId">
              <label>Company ID</label>
              <p>{{ user.companyId }}</p>
            </div>

            <div class="info-group">
              <label>Account Status</label>
              <p class="status-active">Active</p>
            </div>
          </div>

          <!-- Actions Section -->
          <div class="actions-section">
            <Button
              label="Change Password"
              icon="pi pi-lock"
              class="password-btn"
              text
              @click="setPanelView('password')"
            />
          </div>
        </template>

        <template v-else-if="panelView === 'password'">
          <form class="form-section" @submit.prevent="handlePasswordSubmit">
            <BaseInput
              v-model="passwordCurrent"
              name="currentPassword"
              label="Current Password"
              type="password"
              required
              useIftaLabel
              :error="passwordErrors.current"
            />
            <BaseInput
              v-model="passwordNew"
              name="newPassword"
              label="New Password"
              type="password"
              required
              useIftaLabel
              :error="passwordErrors.new"
            />
            <BaseInput
              v-model="passwordConfirm"
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
              required
              useIftaLabel
              :error="passwordErrors.confirm"
            />

            <div class="form-actions">
              <Button
                label="Cancel"
                severity="secondary"
                text
                type="button"
                @click="setPanelView('profile')"
              />
              <Button
                label="Update Password"
                icon="pi pi-check"
                type="submit"
              />
            </div>
          </form>
        </template>

      </div>

      <!-- Footer -->
      <div class="panel-footer" v-if="panelView === 'profile'">
        <Button
          label="Logout"
          icon="pi pi-sign-out"
          class="logout-btn"
          severity="danger"
          text
          @click="handleLogout"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import BaseInput from '~/components/BaseInput.vue'
import { navigateTo } from '#imports'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const panelView = ref<'profile' | 'password'>('profile')

const passwordCurrent = ref('')
const passwordNew = ref('')
const passwordConfirm = ref('')
const passwordErrors = ref({ current: '', new: '', confirm: '' })

const panelTitle = computed(() => {
  if (panelView.value === 'password') return 'Change Password'
  return 'Profile'
})

const initials = computed(() => {
  const username = user.value?.username || 'U'
  return username.charAt(0).toUpperCase()
})

function closePanel() {
  emit('close')
}

function setPanelView(view: 'profile' | 'password') {
  panelView.value = view
}

function handleLogout() {
  closePanel()
  auth.logout()
  navigateTo('/login')
}

function handlePasswordSubmit() {
  passwordErrors.value = { current: '', new: '', confirm: '' }

  if (!passwordCurrent.value.trim()) {
    passwordErrors.value.current = 'Current password is required'
  }
  if (!passwordNew.value.trim()) {
    passwordErrors.value.new = 'New password is required'
  }
  if (!passwordConfirm.value.trim()) {
    passwordErrors.value.confirm = 'Please confirm your new password'
  }

  if (passwordNew.value && passwordConfirm.value && passwordNew.value !== passwordConfirm.value) {
    passwordErrors.value.confirm = 'Passwords do not match'
  }

  const hasErrors = Object.values(passwordErrors.value).some(Boolean)
  if (hasErrors) return

  console.log('Submitting password change')
  setPanelView('profile')
  passwordCurrent.value = ''
  passwordNew.value = ''
  passwordConfirm.value = ''
}

watch(
  () => props.isOpen,
  (isOpen) => {
    if (!isOpen) {
      panelView.value = 'profile'
    }
  }
)
</script>

<style scoped>
/* Backdrop */
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* Side Panel */
.profile-side-panel {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 420px;
  height: 100vh;
  background: white;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.15);
}

/* Panel Header */
.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-header h2 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: #6b7280;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.close-btn:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

.back-btn {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.1rem;
  color: #6b7280;
  padding: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #f3f4f6;
  color: #1f2937;
}

/* Panel Content */
.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Avatar Section */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: #f9fafb;
  border-radius: 12px;
  text-align: center;
}

.avatar-large {
  width: 64px;
  height: 64px;
  background: #2563eb;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.75rem;
}

.username {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937;
}

.role {
  margin: 0;
  font-size: 0.875rem;
  color: #6b7280;
}

/* Info Section */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.info-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-group label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #6b7280;
}

.info-group p {
  margin: 0;
  font-size: 0.9375rem;
  color: #1f2937;
}

.status-active {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  width: fit-content;
}

.status-active::before {
  content: '';
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
}

/* Actions Section */
.actions-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #e5e7eb;
}

.actions-section :deep(.p-button) {
  justify-content: flex-start;
  gap: 12px;
  font-size: 0.9375rem;
  color: #374151;
}

.edit-btn :deep(.p-button-label) {
  color: #2563eb;
}

.password-btn :deep(.p-button-label) {
  color: #f59e0b;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 8px;
}

/* Panel Footer */
.panel-footer {
  padding: 16px 20px;
  border-top: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.logout-btn {
  width: 100%;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

/* Responsive */
@media (max-width: 640px) {
  .profile-side-panel {
    max-width: 100%;
  }
}
</style>
