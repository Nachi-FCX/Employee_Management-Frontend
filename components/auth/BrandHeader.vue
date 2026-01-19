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

<style scoped>
.brand-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.brand-icon .icon-wrapper {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(6, 182, 212, 0.2);
}

.brand-info h1 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #06b6d4 0%, #10b981 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.brand-subtitle {
  margin: 4px 0 0 0;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 500;
}
</style>