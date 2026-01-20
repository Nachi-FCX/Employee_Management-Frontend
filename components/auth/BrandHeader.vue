<!-- components/auth/BrandHeader.vue -->
<template>
  <div class="brand-header">
    <div class="brand-icon">
      <div class="icon-wrapper">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#gradient)" />
          <path d="M2 17L12 22L22 17" stroke="url(#gradient)" stroke-width="2" />
          <path d="M2 12L12 17L22 12" stroke="url(#gradient)" stroke-width="2" />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#06B6D4" />
              <stop offset="100%" stop-color="#10B981" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
    <div class="brand-info">
      <h1>Fincorpx</h1>
      <p class="brand-subtitle">{{ subtitle }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  subtitle?: string;
}>();
</script>

