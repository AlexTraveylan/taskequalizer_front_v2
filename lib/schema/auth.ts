"use client"

import { z } from "zod"
export const authResponseSchema = z.object({
  message: z.string(),
  auth_token: z.optional(z.string()),
})

export type AuthResponse = z.infer<typeof authResponseSchema>

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export const registerCreateSchema = z.object({
  family_name: z.string().min(2, { message: "registerSchema.family_name.min" }).max(25, { message: "registerSchema.family_name.max" }),
  username: z.string().min(2, { message: "registerSchema.username.min" }).max(25, { message: "registerSchema.username.max" }),
  password: z
    .string()
    .min(8, { message: "registerSchema.password.min" })
    .refine((value) => /[a-z]/.test(value), { message: "registerSchema.password.lowercase" })
    .refine((value) => /[A-Z]/.test(value), { message: "registerSchema.password.uppercase" })
    .refine((value) => /\d/.test(value), { message: "registerSchema.password.digit" }),
})

export const registerInviteSchema = z.object({
  username: z.string().min(2, { message: "registerInviteSchema.username.min" }).max(25, { message: "registerInviteSchema.username.max" }),
  password: z
    .string()
    .min(8, { message: "registerInviteSchema.password.min" })
    .refine((value) => /[a-z]/.test(value), { message: "registerInviteSchema.password.lowercase" })
    .refine((value) => /[A-Z]/.test(value), { message: "registerInviteSchema.password.uppercase" })
    .refine((value) => /\d/.test(value), { message: "registerInviteSchema.password.digit" }),
  invitation_code: z.string().regex(/^[A-Z0-9]{8}$/, { message: "registerInviteSchema.invitation_code" }),
})

export const simpleMessageSchema = z.object({
  message: z.string(),
})

export type SimpleMessage = z.infer<typeof simpleMessageSchema>
