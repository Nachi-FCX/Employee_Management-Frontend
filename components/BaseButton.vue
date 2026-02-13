<template>
  <button 
    :type="type"
    :disabled="loading"
    :class="['base-button', variant, { 'is-loading': loading }]"
  >
    <span v-if="loading" class="spinner"></span>
    <i v-else-if="icon" :class="['pi', icon]" aria-hidden="true"></i>
    <slot v-else />
  </button>
  
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button' // Can be 'button', 'submit', or 'reset'
  },
  variant: {
    type: String,
    default: 'primary' // Useful for CSS styling (e.g., 'danger', 'outline')
  },
  icon: {
    type: String,
    default: ''
  }
});
</script>

