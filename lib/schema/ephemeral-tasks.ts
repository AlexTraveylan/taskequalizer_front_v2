import { z } from "zod"

export const ephemeralTaskSchema = z.object({
  id: z.string(),
  ephemeral_task_name: z.string(),
  description: z.string(),
  created_at: z.string(),
  value: z.number(),
  ended_at: z.string().optional(),
  family: z.string(),
  member: z.string().optional(),
})

export type EphemeralTask = z.infer<typeof ephemeralTaskSchema>

export const ephemeralTasksListSchema = z.object({
  data: z.array(ephemeralTaskSchema),
})

export type EphemeralTaskValuePossiblesType = 1 | 2 | 5 | 10 | 15 | 30 | 60 | 120

export const EphemeralTaskValuePossibles: EphemeralTaskValuePossiblesType[] = [1, 2, 5, 10, 15, 30, 60, 120]

export const EphemeralTaskInSchema = z.object({
  ephemeral_task_name: z
    .string()
    .min(2, { message: "ephemeralTaskSchema.ephemeral_task_name.min" })
    .max(25, { message: "ephemeralTaskSchema.ephemeral_task_name.max" }),
  description: z.string().max(1000, { message: "ephemeralTaskSchema.description.max" }),
  value: z.number().refine((value) => [1, 2, 5, 10, 15, 30, 60, 120].includes(value), {
    message: "ephemeralTaskSchema.value.invalid",
  }),
})

export type EphemeralTaskIn = z.infer<typeof EphemeralTaskInSchema>
