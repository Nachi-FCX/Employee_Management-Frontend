<template>
  <div class="attendance-page">
    <div class="page-header">
      <h1>Attendance</h1>
      <p class="subtitle">Track your daily check-in and check-out times</p>
    </div>

    
    <div class="form-card">
      <h2 class="form-title">Attendance</h2>
      
      <div class="form-grid">
        
        <div class="form-field">
          <label class="field-label">Date</label>
          <ClientOnly>
            <Calendar
              v-model="form.date"
              dateFormat="dd/mm/yy"
              placeholder="Select date"
              showIcon
              class="date-input"
            />
          </ClientOnly>
        </div>

        
        <div class="form-field">
          <label class="field-label">Check-in Time</label>
          <input
            v-model="form.checkIn"
            type="time"
            class="time-input"
            placeholder="09:00"
          />
        </div>

        
        <div class="form-field">
          <label class="field-label">Check-out Time</label>
          <input
            v-model="form.checkOut"
            type="time"
            class="time-input"
            placeholder="17:30"
          />
        </div>
      </div>

      
      <div class="form-actions">
        <Button
          label="Submit"
          icon="pi pi-check"
          @click="submitAttendance"
          class="btn-primary"
        />
        <Button
          label="Reset"
          icon="pi pi-refresh"
          severity="secondary"
          @click="resetForm"
          class="btn-secondary"
        />
      </div>
    </div>

    
    <div v-if="records.length" class="records-card">
      <h2 class="records-title">Attendance Records</h2>

      <table class="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Check-in</th>
            <th>Check-out</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(r, i) in records" :key="i">
            <td>{{ r.date }}</td>
            <td>{{ r.checkIn }}</td>
            <td>{{ r.checkOut }}</td>
            <td>{{ r.duration }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Calendar from 'primevue/calendar'
import Button from 'primevue/button'

const form = ref({
  date: null as Date | null,
  checkIn: '',
  checkOut: '',
})

const records = ref<any[]>([])

function submitAttendance() {
  if (!form.value.date || !form.value.checkIn || !form.value.checkOut) {
    alert('Please fill all fields')
    return
  }

  const duration = calculateDuration(
    form.value.checkIn,
    form.value.checkOut
  )

  records.value.push({
    date: form.value.date.toLocaleDateString(),
    checkIn: form.value.checkIn,
    checkOut: form.value.checkOut,
    duration,
  })

  resetForm()
}

function resetForm() {
  form.value.date = null
  form.value.checkIn = ''
  form.value.checkOut = ''
}

function calculateDuration(inTime: string, outTime: string) {
  const [ih, im] = inTime.split(':').map(Number)
  const [oh, om] = outTime.split(':').map(Number)

  const diff = oh * 60 + om - (ih * 60 + im)

  return `${Math.floor(diff / 60)}h ${diff % 60}m`
}
</script>

<style scoped>
.attendance-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
  margin: 0 0 8px 0;
}

.subtitle {
  color: #6b7280;
  font-size: 14px;
  margin: 0;
}

.form-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  padding: 28px;
  border-radius: 12px;
  margin-bottom: 32px;
}

.form-title {
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 24px 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

@media (max-width: 1100px) {
  .form-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
}

.form-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-weight: 600;
  margin-bottom: 10px;
  color: #374151;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.date-input :deep(.p-calendar) {
  width: 100%;
}

.date-input :deep(.p-inputtext) {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
}

.time-input {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  background: #ffffff;
  transition: all 0.2s ease;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
}

.time-input:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.time-input::placeholder {
  color: #9ca3af;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-start;
}

.btn-primary,
.btn-secondary {
  min-width: 120px;
}

.attendance-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.attendance-table th {
  background-color: #f3f4f6;
  padding: 12px;
  border-bottom: 2px solid #e5e7eb;
  font-weight: 600;
  color: #374151;
  text-align: left;
  font-size: 13px;
}

.attendance-table td {
  padding: 12px;
  border-bottom: 1px solid #e5e7eb;
  color: #374151;
  font-size: 14px;
}

.attendance-table tbody tr:hover {
  background-color: #f9fafb;
}
</style>
