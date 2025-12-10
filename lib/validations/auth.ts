import { z } from 'zod';

// Schéma pour l'email
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address')
  .max(255, 'Email is too long');

// Schéma pour le mot de passe
export const passwordSchema = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password is too long')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number');

// Schéma pour le mot de passe simple (minimum 6 caractères)
export const passwordSchemaSimple = z
  .string()
  .min(6, 'Password must be at least 6 characters')
  .max(100, 'Password is too long');

// Schéma pour le nom
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .max(50, 'Name is too long')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, 'Name can only contain letters, spaces, hyphens and apostrophes');

// Schéma pour le prénom/nom optionnel
export const optionalNameSchema = z
  .string()
  .max(50, 'Name is too long')
  .regex(/^[a-zA-ZÀ-ÿ\s'-]*$/, 'Name can only contain letters, spaces, hyphens and apostrophes')
  .optional();

// Schéma de connexion
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchemaSimple, // Pas de regex pour la connexion, juste min 6
});

// Schéma d'inscription
export const signupSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Schéma de profil
export const profileSchema = z.object({
  firstName: optionalNameSchema,
  lastName: optionalNameSchema,
});

// Types TypeScript
export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
