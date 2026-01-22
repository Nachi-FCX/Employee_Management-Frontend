<template>
  <div
    class="form-field"
    :class="{ 'has-error': error, 'has-success': isValid && modelValue }"
  >
    <label :for="id || name" v-if="label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <div class="input-wrapper">
      <input
        v-bind="$attrs"
        :id="id || name"
        :name="name"
        :type="computedType"
        :placeholder="placeholder"
        :value="modelValue"
        :disabled="disabled"
       
        :class="{ 'has-icon': icon, 'has-toggle': type === 'password' }"
        @input="onInput"
        @blur="onBlur"
      />

      <button
        v-if="type === 'password'"
        type="button"
        class="toggle-password"
        @click="togglePasswordVisibility"
        :aria-label="isPasswordVisible ? 'Hide password' : 'Show password'"
      >
        <span class="toggle-text">
          {{ isPasswordVisible ? 'Hide' : 'Show' }}
        </span>
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
import { ref, computed, useAttrs } from 'vue'

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

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  required: false,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const attrs = useAttrs()

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

  const val = String(props.modelValue)

  if (props.required && !val.trim()) return false
  if (props.maxLength && val.length > props.maxLength) return false
  if (props.pattern && !new RegExp(props.pattern).test(val)) return false

  return true
})

/* ✅ IMPORTANT: forward vee-validate events */
const onInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value

  emit('update:modelValue', value)

  if (typeof attrs.onInput === 'function') {
    attrs.onInput(event)
  }
}

const onBlur = (event: Event) => {
  isTouched.value = true
  emit('blur')

  if (typeof attrs.onBlur === 'function') {
    attrs.onBlur(event)
  }
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
    padding-right: 85px;
  }

  &:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.1);
  }
}

.toggle-password {
  position: absolute;
  right: 8px;
  background: none;
  padding: 6px 12px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 5;

  .toggle-text {
    color: #06b6d4;
    font-size: 0.7rem;
    font-weight: 800;
    text-transform: uppercase;
  }
}

.error-message {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 2px;
}
</style>
