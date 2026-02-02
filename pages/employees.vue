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
            <UButton size="xs" @click="editEmployee(row.index)">Edit</UButton>
            <UButton size="xs" color="error" @click="deleteEmployee(row.index)">
              Delete
            </UButton>
          </div>
        </template>
      </UTable>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">

import { fetchEmployees, deleteEmployeeById } from "~/services/employee.service";

interface Employee {
  id:number
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth: Date | null
  join_date: string
  department: string
  salary?: number
}

const employees = useState<Employee[]>('employees', () => [])

onMounted(async () => {
  try {
    const res = await fetchEmployees();


    employees.value = res.data.data || res.data;
  } catch (error) {
    console.error("Failed to fetch employees", error);
  }
});

const columns = [
  {
    header: 'Name',
    cell: ({ row }: any) =>
      `${row.original.first_name} ${row.original.last_name}`
  },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'phone', header: 'Phone' },
  { accessorKey: 'gender', header: 'Gender' },
  { accessorKey: 'department', header: 'Department' },
  { accessorKey: 'join_date', header: 'Join Date' },
  { accessorKey: 'salary', header: 'Salary' },
  { id: 'actions', header: 'Actions' },
]

function editEmployee(index: number){
  navigateTo(`/createemployees?edit=${index}`)
}

async function deleteEmployee(index: number) {
  try {
    const employee = employees.value[index];

    if (!employee) {
      console.error("Employee not found");
      return;
    }

    await deleteEmployeeById(employee.id);
    employees.value.splice(index, 1);
  } catch (error) {
    console.error("Failed to delete employee", error);
  }
}




</script>