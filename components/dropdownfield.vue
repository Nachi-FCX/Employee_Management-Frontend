<template>
  <div class="form-field">
    <ClientOnly>
      <IftaLabel>
        <Select
          v-model="model"
          :inputId="name"
          :options="normalizedOptions"
          optionLabel="label"
          optionValue="value"
          class="w-full"
        />
        <label :for="name">{{ label }}</label>
      </IftaLabel>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IftaLabel from 'primevue/iftalabel'
import Select from 'primevue/select'

const props = defineProps<{
  modelValue: string | number | null
  name: string
  label: string
  items: (string | number)[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number | null): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const normalizedOptions = computed(() =>
  props.items.map(i => ({ label: String(i), value: i }))
)
</script>