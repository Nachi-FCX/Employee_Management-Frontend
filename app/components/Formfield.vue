<template>
    
    <UFormField name="name" label="Name" >
      <UInput type="type" placeholder="Enter Name" v-model="model" />
    </UFormField>

    
    
</template>

<script setup lang="ts">
const props = defineProps<{
  name:string
  label:string
  modelValue:string
  type?:string
  placeholder?:string

}>()

const emit = defineEmits<{
  (e:'update:modelValue',value:string):void
}>()

const model = computed({
  get:() =>props.modelValue,
  set:(val) => emit('update:modelValue',val)
  
})
   


</script>
