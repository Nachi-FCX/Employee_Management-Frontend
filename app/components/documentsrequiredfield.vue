<template>
  <UFormField name="document_required" label="Document Required">
    <USelect :items="['Passport', 'Driving Licence', 'ID Card', 'Resume']" v-model="model" class="w-50"/>
  </UFormField>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue?: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const model = computed({
  get: () => props.modelValue ?? '',
  set: v => emit('update:modelValue', v)
})
</script>
