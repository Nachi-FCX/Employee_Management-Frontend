<template>
    
    <UFormField  :name="name" :label="label">
      <UInput :type="type" :placeholder="placeholder" v-model="model" class="form-input"/>
    </UFormField>

    
    
</template>
<script setup lang="ts">
const props = defineProps<{
  name:string
  label:string
  modelValue:string | number | undefined

  type?:string
  placeholder?:string

}>()

const emit = defineEmits<{
  (e:'update:modelValue',value:string | number | undefined):void
}>()

const model = computed({
  get:() =>props.modelValue,
  set:(val) => emit('update:modelValue',val)
  
})
   


</script>
