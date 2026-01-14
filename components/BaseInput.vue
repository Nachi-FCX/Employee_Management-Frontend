<template>
  <div class="form-group">
    <input
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      required
    />
    <label>{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  label: string
  placeholder: string
  type?: string
}>()
</script>

<style scoped>
.form-group {
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  gap: 6px;
}

input {
  padding: 12px 14px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
}

input:focus {
  border-color: #1abc9c;
  box-shadow: 0 0 6px #1abc9caa;
}

label {
  font-size: 0.9rem;
  color: #777;
}
</style>
