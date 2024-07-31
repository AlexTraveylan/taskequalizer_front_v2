import { z } from "zod"

export const familySettingsSchema = z.object({
  id: z.string(),
  subscription_plan: z.enum(["FREE", "BASIC", "PREMIUM"]),
  locale: z.enum(["en", "fr", "de"]),
  family: z.string(),
})

export type FamilySettings = z.infer<typeof familySettingsSchema>

export const familySettingsInSchema = z.object({
  locale: z.enum(["en", "fr", "de"]),
})

export type FamilySettingsIn = z.infer<typeof familySettingsInSchema>
