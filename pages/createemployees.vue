<template>
  <UContainer class="min-h-screen w-full bg-slate-50 flex justify-center p-6">
    <UCard class="w-full max-w-6xl rounded-2xl shadow-xl mt-6 ">
      <template #header>
        <div class="flex justify-center flex-col gap-2 border-b pb-4 " >
          <h2 class=" text-2xl font-semibold text-slate-800 text-center">
            Employee Creation
          </h2>
          <p class="text-sm text-slate-500">
            Add a new employee by filling in the details below.
          </p>
        </div>
      </template>

    <UForm :schema="EmployeeValidationSchema" :state="formState" @submit.prevent="handleSubmit" >
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">

        <BaseInput
            name="first_name"
            label="First Name"
            v-model="formState.first_name"
            placeholder="Enter First Name"
            :useIftaLabel="true"
          />


        <BaseInput
            name="last_name_name"
            label="Last Name"
            v-model="formState.last_name"
            placeholder="Enter Last Name"
            :useIftaLabel="true"
          />

       <BaseInput
            name="email"
            label="Email"
            v-model="formState.email"
            placeholder="Enter Email"
            :useIftaLabel="true"
          />

        <BaseInput
            name="phone_number"
            label="Phone Number"
            v-model="formState.phone"
            placeholder="Enter Phone Number"
            :useIftaLabel="true"
          />


        <dropdownfield
          name="gender"
          label="Gender"
          v-model="formState.gender"
          :items="['Male', 'Female', 'Other']"
          :useIftalabel="true"
          
        />

     
        <datefield
            class="w-full"
            name="date_of_birth"
            label="Date of Birth"
            v-model="formState.date_of_birth"
            :useIftaLabel="true"
            />


        <datefield
            class="w-full"
            name="join_date"
            label="Join Date"
            v-model="formState.join_date"
            :useIftaLabel="true"
            />

        <dropdownfield
            class="w-full"
            name="department"
            label="Department"
            v-model="formState.department"
            :items="['HR', 'Engineering', 'Finance', 'Marketing']"
            
            />



        <BaseInput
          name="salary"
          label="Salary"
          type="number"
          v-model="formState.salary"
          placeholder="Enter salary"
          :useIftaLabel="true"
        />
        

      </div>

      <div class="flex justify-center mt-8">
        <BaseButton  @click="handleSubmit">
          Create Employee
        </BaseButton>
      </div>
    </UForm>
  </UCard>
  </UContainer>
</template>

<script setup lang="ts">

import dropdownfield from '~/components/dropdownfield.vue'
import datefield from '~/components/datefield.vue'

// import DatePicker from 'primevue/datepicker';

import { EmployeeValidationSchema } from '../Schemas/RegisterSchema'
import type { Employee } from '~/types/employee'
import BaseInput from '~/components/BaseInput.vue'
import BaseButton from '~/components/BaseButton.vue'
import { employeeService } from '~/services/employee.service'

interface EmployeeFormState {
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth:  null
  join_date:  null
  department: string      
  department_id: number
  role_id: number
  username: string
  password: string
  salary: string          
}

import type { CreateEmployeePayload } from '~/types/employee'

const formState = ref<EmployeeFormState>({
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  gender: '',
  date_of_birth: null,
  join_date: null,
  department: '',
  department_id: 0,
  role_id: 0,
  username: '',
  password: '',
  salary: ''
})


// async function handleSubmit () {
//   try {
//     const response = await employeeService.createEmployee({ ...formState.value})

//     console.log('Employee created:', response)


//     formState.value = {
//       employee_code: '',
//       first_name: '',
//       last_name: '',
//       date_of_birth: null,
//       join_date: null,
//       department: '',
//       email: '',
//       phone: '',
//       gender: '',
//       salary: 0,
//       department_id: null,
//       role_id: null
//     }

//   } catch (error: any) {
//     console.error('Failed to create employee', error)
//   }
// }



async function handleSubmit() {
  const payload: CreateEmployeePayload = {
    first_name: formState.value.first_name,
    last_name: formState.value.last_name || undefined,
    email: formState.value.email,
    department_id: Number(formState.value.department_id),
    role_id: Number(formState.value.role_id),
    username: formState.value.username,
    password: formState.value.password,
    salary: formState.value.salary
      ? Number(formState.value.salary)
      : undefined
  }

  console.log(payload)
  await employeeService.createEmployee(payload)
}


</script>
