<template>
  <UContainer class="min-h-screen w-full bg-slate-50 p-6">
    <UCard class="w-full rounded-2xl shadow-lg">
      <template #header>
        <h1 class="text-2xl font-semibold text-slate-800">
          Attendance Records
        </h1>
      </template>

      <UTable :rows="attendanceRecords" :columns="columns">
        
        <template #cell-status="{ row }">
          <UBadge
            :color="row.original.status === 'IN' ? 'success' : 'gray'"
            variant="soft"
          >
            {{ row.original.status }}
          </UBadge>
        </template>

        
        <template #empty-state>
          <div class="py-10 text-center text-gray-400 text-sm">
          </div>
        </template>
      </UTable>

      
      <div class="flex justify-between items-center mt-4">
        <p class="text-sm text-gray-500">
          Showing 0 of 0 records
        </p>

        
      </div>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">

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


const attendanceRecords = useState<AttendanceRecord[]>(
  'attendance-records',
  () => []
)


const columns = [
  { accessorKey: 'employee', header: 'Employee' },
  { accessorKey: 'employeeCode', header: 'Employee Code' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'checkIn', header: 'Check In' },
  { accessorKey: 'checkOut', header: 'Check Out' },
  { accessorKey: 'totalHours', header: 'Total Hours' },
  { accessorKey: 'status', header: 'Status' },
  { accessorKey: 'company', header: 'Company' }
]
</script>