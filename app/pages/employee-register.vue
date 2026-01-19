
<template>
  <EmployeeRegisterLayout @submit="onSubmit" />
</template>

<script setup lang="ts">
import EmployeeRegisterLayout from '~/components/EmployeeRegisterLayout.vue'

function onSubmit (data: any) {
  console.log(data)
}
</script>
