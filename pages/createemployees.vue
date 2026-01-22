<template>
  <UContainer class="min-h-screen w-full bg-slate-50 flex justify-center p-6">
    <UCard class="w-full max-w-6xl rounded-2xl shadow-xl mt-6">
      <template #header>
        <div class="flex flex-col gap-2 border-b pb-4">
          <h2 class="text-2xl font-semibold text-slate-800">
            Employee Creation
          </h2>
          <p class="text-sm text-slate-500">
            Add a new employee by filling in the details below.
          </p>
        </div>
      </template>

    <UForm :schema="EmployeeValidationSchema" :state="formState" @submit="handleSubmit" >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">

        

        <FormInputField
          name="first_name"
          label="First Name"
          v-model="formState.first_name"
          placeholder="Enter first name"
        />

        <FormInputField
          name="last_name"
          label="Last Name"
          v-model="formState.last_name"
          placeholder="Enter last name"
        />

        <FormInputField
          name="email"
          label="Email"
          type="email"
          v-model="formState.email"
          placeholder="Enter email"
        />

        <FormInputField
          name="phone"
          label="Phone Number"
          type="tel"
          v-model="formState.phone"
          placeholder="Enter phone number"
        />

        <dropdownfield
          name="gender"
          label="Gender"
          v-model="formState.gender"
          :items="['Male', 'Female', 'Other']"
        />

        <datefield
            class="w-full"
            name="date_of_birth"
            label="Date of Birth"
            v-model="formState.date_of_birth"
            />
        <datefield
            class="w-full"
            name="join_date"
            label="Join Date"
            v-model="formState.join_date"
            />

        <dropdownfield
            class="w-full"
            name="department"
            label="Department"
            v-model="formState.department"
            :items="['HR', 'Engineering', 'Finance', 'Marketing']"
            />



        <FormInputField
          name="salary"
          label="Salary"
          type="number"
          v-model="formState.salary"
          placeholder="Enter salary"
        />
        

      </div>

      <div class="flex justify-center mt-8">
        <UButton size="lg" color="primary" type="submit" class="px-10">
          Create Employee
        </UButton>
      </div>
    </UForm>
  </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import FormInputField from '~/components/forminputfield.vue'
import dropdownfield from '~/components/dropdownfield.vue'
import Datefield from '~/components/datefield.vue'
import { EmployeeValidationSchema } from '../Schemas/RegisterSchema'
import type { Employee } from '~/types/employee'

interface EmployeeCreate {
  employee_code: string
  first_name: string
  last_name: string
  date_of_birth:string
  join_date:string
  department:string
  email: string
  phone: string
  gender: string
  salary?: number 
  department_id: number | null
  role_id: number | null
}

const formState = ref<EmployeeCreate>({
  employee_code: '',
  first_name: '',
  last_name: '',
  date_of_birth: '',
  join_date:'',
  department:'',
  email: '',
  phone: '',
  gender: '',
  salary: undefined,
  department_id: null,
  role_id: null
})


function handleSubmit(){
const employees = useState<Employee[]>('employees', () => [])

employees.value.push({ ...formState.value })

  formState.value = {
    employee_code: '',
    first_name: '',
    last_name: '',
    date_of_birth:'',
    join_date:'',
    department:'',
    email: '',
    phone: '',
    gender: '',
    salary: undefined,
    department_id: null,
    role_id: null
  }
} 

</script>
