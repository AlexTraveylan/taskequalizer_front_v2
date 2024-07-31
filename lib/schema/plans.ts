import { z } from "zod"

const planInformationsSchema = z.object({
  max_members: z.number(),
  max_possible_tasks: z.number(),
  max_ephemeral_tasks: z.number(),
  amount_cent: z.number(),
  reduction: z.number(),
})

export const plansSchema = z.object({
  FREE: planInformationsSchema,
  BASIC: planInformationsSchema,
  PREMIUM: planInformationsSchema,
})

export type Plans = z.infer<typeof plansSchema>

export const checkoutSessionSchema = z.object({
  client_secret: z.string(),
})

export type CheckoutSession = z.infer<typeof checkoutSessionSchema>
