<template>

 <div class="form-field">
    <ClientOnly>
      <IftaLabel v-if="label">
        <template #default>
          <DatePicker v-model="model" v-bind="$attrs" :name="name" class="date-input" showIcon 
          dateFormat="yy-mm-dd"
          />

          <label :for="name">
            {{ label }}
          </label>
        </template>
      </IftaLabel>
    </ClientOnly>

   
  </div>

</template>

<script setup lang="ts">
// import type DatePicker from 'primevue/datepicker';

import DatePicker from 'primevue/datepicker';

import type IftaLabel from 'primevue/iftalabel';

const props = defineProps<{
  name:string
  label:string
  modelValue?: Date | null
  type?:string
  placeholder?:string

}>()

const emit = defineEmits<{
  (e:'update:modelValue',value:Date | null):void
}>()

const model = computed({
  get:() =>props.modelValue?? null,
  set:(val) => emit('update:modelValue',val)
  
})
   


</script>

<style scoped lang="scss">


input {
  width: 100%;
  padding: 12px 14px;
  font-size: 0.95rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  // transition: all 0.2s ease;
}


</style>

