import { z } from 'zod';

/**
 * 1. REGEX PATTERNS
 * Centralized for consistency across schemas and manual checks
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  UPPERCASE: /[A-Z]/,
  LOWERCASE: /[a-z]/,
  NUMBER: /[0-9]/,
  SPECIAL: /[^A-Za-z0-9]/,
  PHONE: /^\+?[\d\s-]{10,}$/
};

/**
 * 2. PASSWORD STATUS HELPER
 * Powers the "✓" checklist and strength bar in the UI
 */
export const getPasswordStatus = (password: string = '') => {
  const status = {
    hasMinLength: password.length >= 8,
    hasUppercase: REGEX.UPPERCASE.test(password),
    hasLowercase: REGEX.LOWERCASE.test(password),
    hasNumber: REGEX.NUMBER.test(password),
    hasSpecial: REGEX.SPECIAL.test(password),
  };

  const score = Object.values(status).filter(Boolean).length;
  return { ...status, score };
};

/**
 * 3. REUSABLE ATOMIC RULES
 */
export const emailRule = z.string().email('Invalid email address');

export const passwordRule = z.string()
  .min(8, 'Must be at least 8 characters')
  .regex(REGEX.UPPERCASE, 'Requires one uppercase letter')
  .regex(REGEX.SPECIAL, 'Requires one special character');

/**
 * 4. LOGIN SCHEMA
 */
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

/**
 * 5. SIGNUP SCHEMA
 */
export const signupSchema = z.object({
  username: z.string().min(3, 'Username too short (min 3)'),
  email: emailRule,
  phone: z.string().min(10, 'Invalid phone number'),
  password: passwordRule,
  confirmPassword: z.string(),
  agreementAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Please accept the terms to continue' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

/**
 * 6. FILE VALIDATION UTILITY
 */
export const fileSchema = (maxSizeMB: number, allowedTypes: string[]) => {
  return z.any()
    .refine((file) => !file || file.size <= maxSizeMB * 1024 * 1024, `File too large (max ${maxSizeMB}MB)`)
    .refine((file) => !file || allowedTypes.includes(file.type), "Unsupported file format");
};