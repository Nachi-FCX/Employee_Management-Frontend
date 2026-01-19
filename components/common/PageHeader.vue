<!-- components/common/PageHeader.vue -->
<template>
  <div class="page-header">
    <h2 class="title">{{ title }}</h2>
    <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  subtitle?: string;
}>();
</script>

<style scoped>
.page-header {
  margin: 24px 0 32px;
}

.title {
  margin: 0 0 8px 0;
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
}

.subtitle {
  margin: 0;
  color: #64748b;
  font-size: 0.95rem;
  line-height: 1.5;
}
</style>