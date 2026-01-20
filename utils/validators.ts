<!-- utils/validators.ts -->
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  email?: boolean
  phone?: boolean
  custom?: (value: string) => string | boolean
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export const validateField = (
  value: string,
  rules: ValidationRule,
  fieldName: string
): string => {
  if (rules.required && !value?.trim()) {
    return `${fieldName} is required`
  }

  if (value) {
    if (rules.minLength && value.length < rules.minLength) {
      return `${fieldName} must be at least ${rules.minLength} characters`
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      return `${fieldName} must be less than ${rules.maxLength} characters`
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      return `Please enter a valid ${fieldName}`
    }

    if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Please enter a valid email address'
    }

    if (rules.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
      return 'Please enter a valid phone number'
    }

    if (rules.custom) {
      const customResult = rules.custom(value)
      if (typeof customResult === 'string') {
        return customResult
      }
      if (customResult === false) {
        return `${fieldName} is invalid`
      }
    }
  }

  return ''
}

export const validateForm = (
  formData: Record<string, string>,
  validationRules: Record<string, ValidationRule>
): ValidationResult => {
  const errors: Record<string, string> = {}
  let isValid = true

  Object.keys(validationRules).forEach((fieldName) => {
    const value = formData[fieldName] || ''
    const error = validateField(value, validationRules[fieldName], fieldName)
    
    if (error) {
      errors[fieldName] = error
      isValid = false
    }
  })

  return { isValid, errors }
}

// Common validation patterns
export const patterns = {
  username: /^[a-zA-Z0-9_]{3,20}$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[\+]?[1-9][\d]{0,15}$/,
  name: /^[a-zA-Z\s]{2,50}$/,
  numeric: /^\d+$/,
  alphaNumeric: /^[a-zA-Z0-9]+$/
}