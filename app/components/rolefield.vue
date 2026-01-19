<template>
  <UFormField name="role" label="Role">
    <UInput placeholder="Enter role" v-model="model" />
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
