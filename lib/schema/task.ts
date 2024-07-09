import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  related_possible_task: z.string(),
  created_at: z.string(),
  ended_at: z.union([z.string(), z.null()]),
  updated_at: z.string(),
  member: z.string(),
  duration: z.number()
})

export type Task = z.infer<typeof taskSchema>

export type TaskIn = { related_possible_task_id: string }
