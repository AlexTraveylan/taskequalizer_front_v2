import { z } from "zod"

export const familySchema = z.object({
  id: z.string(),
  family_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Family = z.infer<typeof familySchema>

export type FamilyIn = Pick<Family, "family_name">
