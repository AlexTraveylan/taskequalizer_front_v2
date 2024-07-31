import { z } from "zod"

export const memberSchema = z.object({
  id: z.string(),
  member_name: z.string().min(2).max(25),
  email: z.union([z.string().email(), z.null()]),
  created_at: z.string(),
  updated_at: z.string(),
  family_id: z.string(),
})

export type Member = z.infer<typeof memberSchema>

export type MemberIn = Pick<Member, "member_name" | "family_id">

export const whoIamSchema = z.object({
  member_id: z.string(),
})

export type WhoIam = z.infer<typeof whoIamSchema>
