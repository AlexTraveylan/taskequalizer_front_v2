import { z } from "zod"

export const possibleTaskSchema = z.object({
  id: z.string(),
  possible_task_name: z.string().min(2).max(13),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  family_id: z.string(),
})

export type PossibleTask = z.infer<typeof possibleTaskSchema>

export const possibleTaskInSchema = z.object({
  possible_task_name: z
    .string()
    .min(2, { message: "possibleTaskInSchema.possible_task_name.min" })
    .max(13, { message: "possibleTaskInSchema.possible_task_name.max" }),
  description: z.string().max(1000, { message: "possibleTaskInSchema.description.max" }),
})

export type PossibleTaskIn = Pick<PossibleTask, "possible_task_name" | "description">
export type PossibleTaskInWithId = PossibleTaskIn & { id: string }
