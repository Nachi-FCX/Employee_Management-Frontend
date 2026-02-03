<template>
  <UContainer class="min-h-screen w-full bg-slate-50 p-6">
    <UCard class="w-full rounded-2xl shadow-lg">
      <template #header>
        <h1 class="text-2xl font-semibold text-slate-800">
          Employees
        </h1>
      </template>

      <UTable :rows="employees" :columns="columns">
  <template #cell-actions="{ row }">
    <div class="flex gap-2">
      <UButton size="xs" @click="editEmployee(row.index)">
        Edit
      </UButton>
      <UButton
        size="xs"
        color="error"
        @click="deleteEmployee(row.index)"
      >
        Delete
      </UButton>
    </div>
  </template>
</UTable>

    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { employeeService } from '~/services/employee.service'
import type { Employee } from '~/types/employee'

const employees = ref<Employee[]>([])



onMounted(async () => {
  try {
    employees.value = await employeeService.getEmployees()
  } catch (err) {
    console.error('Failed to load employees', err)
  }
})

const columns = [
  {
    header: 'Name',
    cell: ({ row }: any) =>
      `${row.original.first_name} ${row.original.last_name}`
  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'gender', header: 'Gender' },
  {
    header: 'Department',
    cell: ({ row }: any) => row.original.department.name
  },
  { accessorKey: 'join_date', header: 'Join Date' },
  { accessorKey: 'salary', header: 'Salary' },
  { id: 'actions', header: 'Actions' },
]

function editEmployee(index: number) {
  const employee = employees.value[index]
  if (!employee) return

  navigateTo(`/createemployees?edit=${employee.id}`)
}

async function deleteEmployee(index: number) {
  const employee = employees.value[index]
  if (!employee) return

  try {
    await employeeService.deleteEmployee(employee.id)
    employees.value.splice(index, 1)
  } catch (err) {
    console.error('Failed to delete employee', err)
  }
}
</script>
