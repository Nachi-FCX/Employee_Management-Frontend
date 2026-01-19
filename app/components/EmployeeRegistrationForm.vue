<template>
  <UForm :schema="RegistrationValidationSchema" :state="state" @submit="onSubmit">
    <div class="grid grid-cols-3 gap-4">
    <UFormField name="name" label="Name">
      <UInput v-model="state.name" placeholder="Enter name" />
    </UFormField>
    
  <UFormField name="email" label="Email">
    <UInput v-model="state.email" type="email" placeholder="Enter email" />
  </UFormField>


    <UFormField name="dateofbirth" label="Date of Birth">
    <UInput type="date" v-model="state.dateofbirth" />
  </UFormField>

  <UFormField name="gender" label="Gender"  >
      <USelect v-model="state.gender" :items="['Male', 'Female', 'Other']" class="w-50"/>
    </UFormField>

    
    <UFormField name="identification_number" label="Identification Number" >
      <UInput type="type" placeholder="Enter Identification Number" v-model="state.identification_number" />
    </UFormField>

    <UFormField name="Number" label="Phone Number" >
    <UInput type="tel" placeholder="Enter phone number" v-model="state.Number" />
  </UFormField>

    <UFormField name="address" label="Address">
    <UTextarea placeholder="Enter address" v-model="state.address" />
  </UFormField>

    <UFormField name="role" label="Role">
    <UInput placeholder="Enter role" v-model="state.role" />
  </UFormField>

    <UFormField name="contract_type" label="Contract Type" >
    <USelect :items="['Permanent', 'Contract', 'Internship']"v-model="state.contract_type" class="w-50"
    />
  </UFormField>

    <UFormField name="document_required" label="Document Required">
    <USelect :items="['Passport', 'Driving Licence', 'ID Card', 'Resume']" v-model="state.document_required" class="w-50"/>
  </UFormField>

    
    
    </div>
    <div class="flex justify-center">
    <UButton class="mt-6" color="success" >Register</UButton>
    </div>
  </UForm>

</template>

<script setup lang="ts">
import { RegistrationValidationSchema } from '../../Schemas/RegisterSchema'
import type { FormSubmitEvent } from '@nuxt/ui'

import type { Employee } from '~/types/employee';



defineProps<{
  state: Employee
}>(
  
)

const emit = defineEmits<{ (e: 'submit', payload: any): void }>()

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data)
}
</script>
