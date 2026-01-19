<!-- components/BaseInput.vue -->
<template>
  <div class="form-field" :class="{ 'has-error': error, 'has-success': isValid && modelValue }">
    <input
      :id="id || name"
      :type="computedType"
      :placeholder="placeholder"
      :value="modelValue"
      @input="handleInput"
      @blur="handleBlur"
      :disabled="disabled"
      :required="required"
      :class="{ 'has-icon': icon, 'has-toggle': type === 'password' }"
    />
    <label :for="id || name" v-if="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    
    <!-- Password toggle button -->
    <button 
      v-if="type === 'password'" 
      type="button" 
      class="toggle-password"
      @click="togglePasswordVisibility"
      :aria-label="computedType === 'password' ? 'Show password' : 'Hide password'"
    >
      {{ computedType === 'password' ? 'Show' : 'Hide' }}
    </button>
    
    <!-- Validation messages -->
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="hint && !error" class="hint">{{ hint }}</div>
    
    <!-- Character counter -->
    <div v-if="maxLength" class="char-counter">
      {{ modelValue?.length || 0 }}/{{ maxLength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string
  label?: string
  placeholder?: string
  type?: string
  id?: string
  name?: string
  error?: string
  hint?: string
  disabled?: boolean
  required?: boolean
  maxLength?: number
  pattern?: string
  icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'blur': []
}>()

const isTouched = ref(false)
const isPasswordVisible = ref(false)

const computedType = computed(() => {
  if (props.type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }
  return props.type
})

const isValid = computed(() => {
  if (!props.modelValue) return false
  if (props.error) return false
  
  // Basic validation
  if (props.required && !props.modelValue.trim()) return false
  if (props.maxLength && props.modelValue.length > props.maxLength) return false
  if (props.pattern && !new RegExp(props.pattern).test(props.modelValue)) return false
  
  return true
})

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  emit('update:modelValue', value)
}

const handleBlur = () => {
  isTouched.value = true
  emit('blur')
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<style scoped>
.form-field {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 16px;
}

label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 4px;
}

.required {
  color: #ef4444;
  margin-left: 2px;
}

input {
  width: 90%;
  padding: 12px 14px;
  font-size: 0.95rem;
  color: #0f172a;
  background: #ffffff;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-family: inherit;
}

input.has-toggle {
  padding-right: 60px;
}

input:focus {
  outline: none;
  border-color: #06b6d4;
  box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
}

input:disabled {
  background-color: #f8fafc;
  cursor: not-allowed;
  opacity: 0.7;
}

input.has-icon {
  padding-left: 40px;
}

/* Error states */
.form-field.has-error input {
  border-color: #ef4444;
}

.form-field.has-error input:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

/* Success states */
.form-field.has-success input {
  border-color: #10b981;
}

.form-field.has-success input:focus {
  border-color: #10b981;
  box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1);
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 2px;
}

.hint {
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 2px;
}

.toggle-password {
  position: absolute;
  right: 12px;
  top: 15px;
  background: none;
  border: none;
  color: #06b6d4;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 8px;
  z-index: 2;
  
}

.char-counter {
  font-size: 0.75rem;
  color: #64748b;
  text-align: right;
  margin-top: 2px;
}
</style>