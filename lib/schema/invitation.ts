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

export const validListInvitationSchema = z.object({
  data: z.array(invitationSchema),
})

export const messageResponseSchema = z.object({
  message: z.string(),
})

export type MessageResponse = z.infer<typeof messageResponseSchema>
