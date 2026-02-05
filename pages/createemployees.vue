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

    <UForm :schema="EmployeeValidationSchema" :state="formState" @submit="handleSubmit" >
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
            name="department_id"
            label="Department"
            v-model="formState.department_id"
            :items="[
              { label: 'HR', value: 1 },
              { label: 'Engineering', value: 2 },
              { label: 'Finance', value: 3 },
              { label: 'Marketing', value: 4 }
            ]"
            :useIftaLabel="true"
          />




        <BaseInput
          name="salary"
          label="Salary"
          type="number"
          v-model="formState.salary"
          placeholder="Enter salary"
          :useIftaLabel="true"
        />

        <dropdownfield
          name="company_id"
          label="Company"
          v-model="formState.company_id"
          :items="companies.map(c => ({
            label: c.company_name,
            value: c.id
          }))"
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
  company_id: number | null
  first_name: string
  last_name: string
  email: string
  phone: string
  gender: string
  date_of_birth:  Date | null
  join_date:  Date | null
  department: string      
  department_id: number | null
  role_id: number | null
  username: string
  password: string
  salary: string          
}

import type { CreateEmployeePayload } from '~/types/employee'
import { companyService } from '~/services/company.service'

const formState = ref<EmployeeFormState>({
  company_id: null,
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  gender: '',
  date_of_birth: null,
  join_date: null,
  department: '',
  department_id: null ,
  role_id: null ,
  username: '',
  password: '',
  salary: ''
})





interface Company {
  id: string
  company_name: string
}



const companies = ref<Company[]>([])

const token = useCookie('token')
onMounted(async () => {
  try {
    if (!token.value) {
      console.error('Token not found in cookies')
      return
    }

    companies.value = await companyService.getCompanies(token.value)
    console.log(companies.value)
    console.log("companies : ",companies.value )
  } catch (err) {
    console.error('Failed to fetch companies', err)
  }
})





async function handleSubmit() {
  const payload: CreateEmployeePayload = {
    company_id:Number(formState.value.company_id),
    first_name: formState.value.first_name,
    last_name: formState.value.last_name || undefined,
    email: formState.value.email,
    // department_id: Number(formState.value.department_id),
    // role_id: Number(formState.value.role_id),
    // username: formState.value.username,
    // password: formState.value.password,
    department_id:2,
    role_id:1,


    username:"suresh5678",
    password:"Suresh@@09876",
    salary: formState.value.salary
      ? Number(formState.value.salary)
      : undefined
  }
  

  console.log('CreateEmployee payload:', payload)
  await employeeService.createEmployee(payload)
}


</script>
