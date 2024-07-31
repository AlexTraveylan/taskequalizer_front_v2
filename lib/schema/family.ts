import { z } from "zod"
import { taskSchema } from "./task"

export const familySchema = z.object({
  id: z.string(),
  family_name: z.string().min(2).max(25),
  created_at: z.string(),
  updated_at: z.string(),
})

export type Family = z.infer<typeof familySchema>

export const dataTasksByMembersSchema = z.object({
  data: z.array(
    z.object({
      member_name: z.string(),
      tasks: z.array(taskSchema),
    })
  ),
})

export type DataTasksByMembers = z.infer<typeof dataTasksByMembersSchema>

export const dataPossibleTasksDetailsSchema = z.object({
  data: z.array(
    z.object({
      p_task_id: z.string(),
      members: z.array(
        z.object({
          member_name: z.string(),
          tasks: z.array(taskSchema),
        })
      ),
    })
  ),
})

export type DataPossibleTasksDetails = z.infer<typeof dataPossibleTasksDetailsSchema>

export const familyInSchema = z.object({
  family_name: z.string().min(2, { message: "registerSchema.family_name.min" }).max(25, { message: "registerSchema.family_name.max" }),
})

export type FamilyIn = z.infer<typeof familyInSchema>

export const durationTaskSchema = z.object({
  duration: z.number(),
})

export const tasksByDateByMemberSchema = z.record(z.string(), z.record(z.string(), z.array(durationTaskSchema)))

export type TasksByDateByMember = z.infer<typeof tasksByDateByMemberSchema>
