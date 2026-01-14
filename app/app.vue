
<script setup lang = "ts">
import type { FormSubmitEvent } from '@nuxt/ui';
import{ RegistrationValidationSchema } from '../Schemas/RegisterSchema'
import{z} from 'zod'
import { CalendarDate } from '@internationalized/date'


  const formState = ref({
    
    name:'',
    dateofbirth:'',
    gender:'',
    email:'',
    identification_number:'',
    Number:'',
    address:'',
    role:'',
    contract_type:'',
    document_required:''   

  })

function handleFormSubmit(event :FormSubmitEvent <z.output<typeof RegistrationValidationSchema>>){

  console.log(event.data)
}


</script>

<template>
  <UContainer class = "grid place-content-center h-screen">
    <UCard class="w-[500px]">

      <template #header>
        <h2 class = "text-xl font-bold">EMPLOYEE REGISTRATION</h2>
      </template>

      <UForm :schema="RegistrationValidationSchema" :state="formState" @submit="handleFormSubmit">
        <UFormField name = "name" label="Name" >

        <UInput type ="text" v-model= "formState.name" placeholder="Enter Name"/>

        </UFormField>

        <UFormField name = "email" label="Email" class="mt-5" >

        <UInput type ="email" v-model= "formState.email" placeholder="Enter Email"/>

        </UFormField>

        <UFormField name="dateofbirth" label="Date of Birth" class="mt-5">
          <UInput type="date" v-model="formState.dateofbirth" />
        </UFormField>

        <UFormField name="gender" label="Gender" class="mt-5" >
          <USelect
            v-model="formState.gender" :items="['Male', 'Female', 'Other']" placeholder="Select gender"/>
        </UFormField>

        <UFormField name="identification_number" label="Identification Number" class="mt-5">
                <UInput type="text" v-model="formState.identification_number" placeholder="Enter ID number" />
              </UFormField>

              <UFormField name="Number" label="Phone Number" class="mt-5">
                <UInput type="tel" v-model="formState.Number" placeholder="Enter phone number"/>
              </UFormField>

              <UFormField name="address" label="Address">
                <UTextarea v-model="formState.address" placeholder="Enter address"/>
              </UFormField>

              <UFormField name="role" label="Role">
                <UInput type="text" v-model="formState.role" placeholder="Enter role" />
              </UFormField>

              <UFormField name="contract_type" label="Contract Type">
                <USelect v-model="formState.contract_type" :items="['Permanent', 'Contract', 'Internship']" 
                placeholder="Select contract type" />
              </UFormField>

              <UFormField name="document_required" label="Document Required">
                <USelect v-model="formState.document_required" :items="['Passport', 'Driving Licence', 'ID Card', 'Resume']"
                  placeholder="Select document"
                  />
              </UFormField>


        <UButton>Register</UButton>

      </UForm>
    </UCard>


  </UContainer>
    

</template>
