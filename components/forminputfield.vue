<template>
    
    <UFormField  :name="name" :label="label">
      <UInput :type="type" :placeholder="placeholder" v-model="model" class="form-input"/>
    </UFormField> 
  

    <!-- <IftaLabel>
    <InputText :id="name" v-model="model" :invalid="!value" :placeholder="placeholder"/>
     <label for="name">{{label}}</label>
    </IftaLabel> -->
    
    
</template>
<script setup lang="ts">
  import { computed } from 'vue'
const props = defineProps<{
  name:string
  label:string
  modelValue:string  | undefined

  type?:string
  placeholder?:string

}>()

const emit = defineEmits<{
  (e:'update:modelValue',value:string  | undefined):void
}>()

const model = computed({
  get:() =>props.modelValue,
  set:(val) => emit('update:modelValue',val)
  
})
   


</script>
