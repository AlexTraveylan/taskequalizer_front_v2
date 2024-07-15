import { z } from "zod"

export const authResponseSchema = z.object({
  message: z.string(),
  auth_token: z.optional(z.string()),
})

export type AuthResponse = z.infer<typeof authResponseSchema>
