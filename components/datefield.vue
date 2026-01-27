<template>

  <div class="form-field">
    <ClientOnly>
      <IftaLabel>
        <DatePicker
          v-model="model":inputId="name":name="name" showIcon iconDisplay="input" variant="filled"
          dateFormat="yy-mm-dd"class="w-full"
        />
        <label :for="name">{{ label }}</label>
      </IftaLabel>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
// import type DatePicker from 'primevue/datepicker';

import DatePicker from 'primevue/datepicker';
import type FloatLabel from 'primevue/floatlabel';

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


