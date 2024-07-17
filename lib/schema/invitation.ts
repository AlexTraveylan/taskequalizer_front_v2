import { z } from "zod"

export const invitationSchema = z.object({
  id: z.string(),
  code: z.string().regex(/^[A-Z0-9]{8}$/),
  is_used: z.boolean(),
  family: z.string(),
  created_at: z.string(),
  expired_at: z.string(),
})

export type Invitation = z.infer<typeof invitationSchema>
