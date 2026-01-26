
<template>
  
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
