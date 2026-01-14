<template>
  <button :disabled="loading">
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
</script>

<style scoped>
button {
  padding: 14px;
  background-color: #1abc9c;
  color: white;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1.1rem;
}

button:hover {
  background-color: #16a085;
}

button:disabled {
  background-color: #8acfcf;
  cursor: not-allowed;
}
</style>
