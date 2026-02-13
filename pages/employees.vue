<template>

  <UContainer class="min-h-screen w-full bg-slate-50 p-6">
    <UCard class="w-full rounded-2xl shadow-lg">


      <template #header>
        <h1 class="text-2xl font-semibold text-slate-800">
          Employees
        </h1>
      </template>

  <ClientOnly>
  <DataTable :value="tableData" :columns="columns" paginator :rows="10">


    <template #actions="{ index }">
      <Button icon="pi pi-pencil" variant="outlined" rounded class="mr-2" @click="editEmployee(index)" />
      <Button icon="pi pi-trash" variant="outlined" rounded severity="danger"@click="deleteEmployee(index)"/>
    </template>

  </DataTable>
</ClientOnly>




    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { employeeService } from '~/services/employee.service'
import type { Employee } from '~/types/employee'
import DataTable from '~/components/DataTable.vue'
import Button from 'primevue/button'


const employees = ref<Employee[]>([])
const tableData = computed(() =>
  employees.value.map(emp => ({
    ...emp,
    fullName: `${emp.first_name} ${emp.last_name}`,
    departmentName: emp.department?.name ?? ''
  }))
)



onMounted(async () => {
  try {
     employees.value = await employeeService.getEmployees(15)
     console.log(employees.value)
  } catch (err) {
    console.error('Failed to load employees', err)
  }
})

const columns = [
  { field: 'fullName', header: 'Name' },
  { field: 'email', header: 'Email' },
  { field: 'phone', header: 'Phone' },
  { field: 'gender', header: 'Gender' },
  { field: 'departmentName', header: 'Department' },
  { field: 'join_date', header: 'Join Date' },
  { field: 'salary', header: 'Salary' },
  { field: 'actions', header: 'Actions' }
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
