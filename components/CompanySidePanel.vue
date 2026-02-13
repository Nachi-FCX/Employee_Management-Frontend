<template>
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="sidebar-backdrop"
      @click="closePanel"
    ></div>
  </Transition>

  <Transition name="slide">
    <div v-if="isOpen" class="company-side-panel">
      <div class="panel-header">
        <div class="panel-title">
          <h2>Company</h2>
        </div>
        <button class="close-btn" @click="closePanel">
          <i class="pi pi-times"></i>
        </button>
      </div>

      <div class="panel-content">
        <div class="company-icon"></div>
        <div class="info-section">
          <div class="info-group">
            <label>Company Name</label>
            <p>{{ companyName }}</p>
          </div>

          <div class="info-group">
            <label>Company Email</label>
            <p>{{ companyEmail }}</p>
          </div>

          <div class="info-group">
            <label>Industry</label>
            <p>{{ companyIndustry }}</p>
          </div>

          <div class="info-group" v-if="user?.companyId">
            <label>Company ID</label>
            <p>{{ user.companyId }}</p>
          </div>

          <div class="info-group">
            <label>Setup Status</label>
            <p :class="user?.companyCompleted ? 'status-active' : 'status-pending'">
              {{ user?.companyCompleted ? 'Completed' : 'Pending' }}
            </p>
          </div>
        </div>
      </div>

      <div class="panel-footer">
        <Button
          label="Close"
          severity="secondary"
          text
          @click="closePanel"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import { useAuthStore } from '~/stores/auth'

interface Props {
  isOpen: boolean
}

defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const auth = useAuthStore()
const { user } = storeToRefs(auth)

const companyName = computed(() => 'Not set')
const companyEmail = computed(() => 'Not set')
const companyIndustry = computed(() => 'Not set')

function closePanel() {
  emit('close')
}
</script>

<style scoped>
.sidebar-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.company-side-panel {
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

.panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  border-bottom: 1px solid #eef2f7;
}

.panel-title h2 {
  margin: 0;
  font-size: 18px;
  color: #0f172a;
}

.close-btn {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: none;
  background: #f1f5f9;
  cursor: pointer;
}

.panel-content {
  padding: 20px;
  overflow-y: auto;
}

.company-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 16px;
  background: #f8fafc;
  font-size: 28px;
  margin: 0 auto 18px;
}

.info-section {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.info-group label {
  font-size: 12px;
  color: #94a3b8;
}

.info-group p {
  margin: 4px 0 0;
  font-weight: 600;
  color: #0f172a;
}

.status-active {
  color: #16a34a;
}

.status-pending {
  color: #f59e0b;
}

.panel-footer {
  margin-top: auto;
  padding: 16px 20px;
  border-top: 1px solid #eef2f7;
  display: flex;
  justify-content: flex-end;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
