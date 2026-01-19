<template>
  <UForm :schema="RegistrationValidationSchema" :state="state" @submit="onSubmit">
    <div class="grid grid-cols-3 gap-4">
    <Formfield
      name="name"
      label="label"
      placeholder="Enter Name"
      v-model = "state.name"
    />
    
    <Emailfield  v-model="state.email"/>
    <Dobfield v-model="state.dateofbirth"/>
    <Genderfield v-model="state.gender"/>
    <Identificationnumber v-model="state.identificationnumber"/>
    <Phonefield v-model="state.Number" />
    <Addressfield v-model="state.address" />
    <Rolefield v-model="state.role" />
    <Contracttypefield v-model="state.contract_type" />
    <Documentsrequiredfield v-model="state.document_required" />

    
    
    </div>
    <div class="flex justify-center">
    <UButton class="mt-6" color="success" >Register</UButton>
    </div>
  </UForm>

</template>

<script setup lang="ts">
import { RegistrationValidationSchema } from '../../Schemas/RegisterSchema'
import type { FormSubmitEvent } from '@nuxt/ui'
import Emailfield from './emailfield.vue';
import Dobfield from './dobfield.vue';
import Genderfield from './genderfield.vue';
import Identificationnumber from './identificationnumber.vue';
import Phonefield from './phonefield.vue';
import Addressfield from './addressfield.vue';
import Rolefield from './rolefield.vue';
import Contracttypefield from './contracttypefield.vue';
import Documentsrequiredfield from './documentsrequiredfield.vue';

defineProps<{ state: Record<string, any> }>()

const emit = defineEmits<{ (e: 'submit', payload: any): void }>()

function onSubmit(event: FormSubmitEvent<any>) {
  emit('submit', event.data)
}
</script>
