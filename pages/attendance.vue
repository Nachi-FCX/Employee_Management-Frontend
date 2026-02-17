<template>
  <UContainer class="min-h-screen w-full bg-slate-50 p-6">
    <UCard class="w-full rounded-2xl shadow-lg">
      <template #header>
        <h1 class="text-2xl font-semibold text-slate-800">
          Attendance Records
        </h1>
      </template>

      <ClientOnly>
        <DataTable :value="attendanceRecords" :columns="columns" :loading="isLoading">
          <template #status="{ data }">
            <span :class="data.status === 'IN' ? 'text-green-600' : 'text-gray-600'">
              {{ data.status }}
            </span>
          </template>
        </DataTable>
      </ClientOnly>

      
      <div class="flex justify-between items-center mt-4">
        <p class="text-sm text-gray-500">
          Showing {{ totalRecords }} of {{ totalRecords }} records
        </p>

        
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useAttendanceService } from '~/services/attendance.service'
import DataTable from '~/components/DataTable.vue'

interface AttendanceLogApi {
  employee?: {
    first_name?: string
    last_name?: string
    employee_code?: string
  }
  employee_name?: string
  employee_code?: string
  employee_id?: number
  attendance_id?: number
  company?: {
    company_name?: string
  }
  company_name?: string
  company_id?: number
  date?: string
  check_in_time?: string
  check_out_time?: string
  check_in?: string
  check_out?: string | null
  duration?: string
  status?: 'IN' | 'OUT'
}

interface AttendanceRecord {
  employee: string
  employeeCode: string
  date: string
  checkIn: string
  checkOut: string
  totalHours: string
  status: 'IN' | 'OUT'
  company: string
}

const attendanceRecords = ref<AttendanceRecord[]>([])
const isLoading = ref(false)
const { getAttendanceRecords } = useAttendanceService()

const totalRecords = computed(() => attendanceRecords.value.length)

function resolveEmployeeName(log: AttendanceLogApi): string {
  if (log.employee_name) return log.employee_name
  const first = log.employee?.first_name ?? ''
  const last = log.employee?.last_name ?? ''
  const full = `${first} ${last}`.trim()
  return full || 'Unknown'
}

function resolveEmployeeCode(log: AttendanceLogApi): string {
  return log.employee?.employee_code || log.employee_code || ''
}

function resolveCompanyName(log: AttendanceLogApi): string {
  return log.company?.company_name || log.company_name || ''
}

function resolveStatus(log: AttendanceLogApi): 'IN' | 'OUT' {
  if (log.status === 'IN' || log.status === 'OUT') return log.status
  return log.check_out_time || log.check_out ? 'OUT' : 'IN'
}

function mapLogToRecord(log: AttendanceLogApi): AttendanceRecord {
  return {
    employee: resolveEmployeeName(log),
    employeeCode: resolveEmployeeCode(log),
    date: log.date || '',
    checkIn: log.check_in_time || log.check_in || '',
    checkOut: log.check_out_time || log.check_out || '',
    totalHours: log.duration || '',
    status: resolveStatus(log),
    company: resolveCompanyName(log)
  }
}

async function fetchAttendanceRecords() {
  isLoading.value = true
  try {
    const response = await getAttendanceRecords()
    const payload = (response as any).data
    const logs = Array.isArray(payload?.data) ? payload.data : []
    attendanceRecords.value = logs.map((log: any) => mapLogToRecord(log))
    console.log('Attendance records loaded:', attendanceRecords.value)
  } catch (err) {
    console.error('Failed to load attendance records', err)
    attendanceRecords.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(fetchAttendanceRecords)

const columns = [
  { field: 'employee', header: 'Employee' },
  { field: 'employeeCode', header: 'Employee Code' },
  { field: 'date', header: 'Date' },
  { field: 'checkIn', header: 'Check In' },
  { field: 'checkOut', header: 'Check Out' },
  { field: 'totalHours', header: 'Total Hours' },
  { field: 'status', header: 'Status' },
  { field: 'company', header: 'Company' }
]
</script>