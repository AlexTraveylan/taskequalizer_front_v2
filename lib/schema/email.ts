import { z } from "zod"

export const emailContactSchema = z.object({
  email: z.string().email({
    message: "contact.form.validation.email",
  }),
  message: z.string().min(10, {
    message: "contact.form.validation.message",
  }),
})

export type EmailContact = z.infer<typeof emailContactSchema>
