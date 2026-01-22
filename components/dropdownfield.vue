
<template>
  <UFormField :name="name" :label="label">
    <USelect v-model="model" :items="items" class="w-47" />
  </UFormField>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  name: string
  label: string
  modelValue: string
  items: string[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})
</script>
