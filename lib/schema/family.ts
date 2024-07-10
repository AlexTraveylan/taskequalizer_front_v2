import { z } from "zod"
import { taskSchema } from "./task"

export const familySchema = z.object({
  id: z.string(),
  family_name: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Family = z.infer<typeof familySchema>

export type FamilyIn = Pick<Family, "family_name">

export const dataTasksByMembersSchema = z.object({
  data: z.array(
    z.object({
      member_name: z.string(),
      tasks: z.array(taskSchema),
    })
  ),
})

export type DataTasksByMembers = z.infer<typeof dataTasksByMembersSchema>
