<template>
  <UContainer class="min-h-screen w-full bg-slate-50 flex justify-center p-6">
    <UCard class="w-full max-w-6xl rounded-2xl shadow-xl mt-6 bg-white">
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
    
      <div class="flex justify-center">
        <UForm>
          <UButton class="mt-6" color="error" type="submit">
            Create Employee
          </UButton>
        </UForm>
        </div>
      
    </UCard>
  

    
  </UContainer>
  
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>

</style>