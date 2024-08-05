import { z } from "zod"

export const emailContactSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer une adresse e-mail valide.",
  }),
  message: z.string().min(10, {
    message: "Le message doit contenir au moins 10 caractères.",
  }),
})

export type EmailContact = z.infer<typeof emailContactSchema>
