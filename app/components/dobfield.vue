<template>
  <UFormField name="dateofbirth" label="Date of Birth">
    <UInput type="date" v-model="model" />
  </UFormField>
</template>

<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const model = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v)
})
</script>
