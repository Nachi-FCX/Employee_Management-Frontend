<template>
  <UContainer class="min-h-screen w-full p-0">
    <UCard class="w-full min-h-screen rounded-none">
      <template #header>
        <h2 class="text-xl font-bold">EMPLOYEE REGISTRATION</h2>
      </template>

      <EmployeeRegistrationForm :state="formState" @submit="handleSubmit"
      />
    </UCard>
  </UContainer>
</template>


<script setup lang="ts">
import EmployeeRegistrationForm from './EmployeeRegistrationForm.vue'

const emit = defineEmits<{ (e: 'submit', payload: any): void }>()

const formState = ref({
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

function handleSubmit (data: any) {
  emit('submit', data)
}
</script>