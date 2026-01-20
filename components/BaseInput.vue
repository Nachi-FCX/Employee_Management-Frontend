<template>
  <div class="form-field" :class="{ 'has-error': error, 'has-success': isValid && modelValue }">
    <label :for="id || name" v-if="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="input-wrapper">
      <input
        v-bind="$attrs"
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
      
      <button 
        v-if="type === 'password'" 
        type="button" 
        class="toggle-password"
        @click="togglePasswordVisibility"
        :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
      >
        <span class="toggle-text">{{ isPasswordVisible ? 'Hide' : 'Show' }}</span>
      </button>
    </div>
    
    <div v-if="error" class="error-message">{{ error }}</div>
    <div v-if="hint && !error" class="hint">{{ hint }}</div>
    
    <div v-if="maxLength" class="char-counter">
      {{ modelValue?.length || 0 }}/{{ maxLength }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string | number
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

// Disable attribute inheritance so we can manually bind $attrs to the <input>
defineOptions({ inheritAttrs: false })

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
  const valString = String(props.modelValue);
  if (props.required && !valString.trim()) return false
  if (props.maxLength && valString.length > props.maxLength) return false
  if (props.pattern && !new RegExp(props.pattern).test(valString)) return false
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

<style scoped lang="scss">
.form-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

input {
  width: 100%;
  padding: 12px 14px;
  font-size: 0.95rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  transition: all 0.2s ease;
  
  &.has-toggle {
    padding-right: 85px; // Extra space for the Show button
  }
  
  &:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
}

/* THE NEW STYLE: High-contrast Dashboard Toggle */
.toggle-password {
  position: absolute;
  right: 8px;
  
  /* Overriding Global Scss */
  background: none;
  width: auto !important;
  height: auto !important;
  padding: 6px 12px !important;
  border-radius: 8px !important;
  margin: 0 !important;
  
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s ease !important;
  z-index: 5;

  

  .toggle-text {
    color: #06b6d4;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    line-height: 1;
    
    &.is-active {
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);
    }
  }
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 2px;
}
</style>