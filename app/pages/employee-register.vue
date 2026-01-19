<template>
  <UContainer class="min-h-screen w-full p-0">
    <UCard class="w-full min-h-screen rounded-none">
      <template #header>
        <h2 class="text-xl font-bold">EMPLOYEE CREATION</h2>
      </template>

      <UForm
        :schema="RegistrationValidationSchema"
        :state="formState"
        @submit="handleSubmit"
      >
        <div class="grid grid-cols-3 gap-4">
          <UFormField name="name" label="Name">
            <UInput v-model="formState.name" placeholder="Enter name" />
          </UFormField>

          <UFormField name="email" label="Email">
            <UInput v-model="formState.email" type="email" placeholder="Enter email" />
          </UFormField>

          <UFormField name="dateofbirth" label="Date of Birth">
            <UInput type="date" v-model="formState.dateofbirth" />
          </UFormField>

          <UFormField name="gender" label="Gender" >
            <USelect v-model="formState.gender" :items="['Male', 'Female', 'Other'] " class="w-50" />
          </UFormField>

          <UFormField name="identification_number" label="Identification Number">
            <UInput v-model="formState.identification_number" placeholder="Enter Identification Number" />
          </UFormField>

          <UFormField name="Number" label="Phone Number">
            <UInput type="tel" v-model="formState.Number" placeholder="Enter phone number" />
          </UFormField>

          <UFormField name="address" label="Address">
            <UTextarea v-model="formState.address" placeholder="Enter address" />
          </UFormField>

          <UFormField name="role" label="Role">
            <UInput v-model="formState.role" placeholder="Enter role" />
          </UFormField>

          <UFormField name="contract_type" label="Contract Type">
            <USelect
              v-model="formState.contract_type"
              :items="['Permanent', 'Contract', 'Internship']" class="w-50"
            />
          </UFormField>

          <UFormField name="document_required" label="Document Required">
            <USelect
              v-model="formState.document_required"
              :items="['Passport', 'Driving Licence', 'ID Card', 'Resume']" class="w-50"
            />
          </UFormField>
        </div>

        <div class="flex justify-center">
          <UButton class="mt-6" color="success" type="submit">
            Register
          </UButton>
        </div>
      </UForm>
    </UCard>
  </UContainer>
</template>

<script setup lang="ts">
import { RegistrationValidationSchema } from '../../Schemas/RegisterSchema'
import type { FormSubmitEvent } from '@nuxt/ui'
import type { Employee } from '~/types/employee'

const formState = ref<Employee>({
  name: '',
  dateofbirth: '',
  gender: '',
  email: '',
  identification_number: '',
  Number: '',
  address: '',
  role: '',
  contract_type: '',
  document_required: ''
})

function handleSubmit(event: FormSubmitEvent<Employee>) {
  console.log(event.data)
}
</script>
