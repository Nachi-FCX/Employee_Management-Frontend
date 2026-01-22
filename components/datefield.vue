<template>


  <UFormField :name="name" :label="label">
    <UInput type="date" v-model="model" class="w-50" />
  </UFormField>



</template>

<script setup lang="ts">
const props = defineProps<{
  name:string
  label:string
  modelValue?: string
  type?:string
  placeholder?:string

}>()

const emit = defineEmits<{
  (e:'update:modelValue',value:string):void
}>()

const model = computed({
  get:() =>props.modelValue?? '',
  set:(val) => emit('update:modelValue',val)
  
})
   


</script>

