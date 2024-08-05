"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EmailContact, emailContactSchema } from "@/lib/schema/email"
import { emailService } from "@/lib/services/email"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ContactPage() {
  const [btnDisabled, setBtnDisabled] = useState(false)

  const form = useForm<EmailContact>({
    resolver: zodResolver(emailContactSchema),
    defaultValues: {
      email: "",
      message: "",
    },
  })

  async function onSubmit(values: EmailContact) {
    try {
      const message = await emailService.sendContactEmail(values.email, values.message)
      setBtnDisabled(true)
      console.log(message)
    } catch (error) {
      console.log("Failed to send email", error)
    }
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Contactez-nous</h1>

        <div className="max-w-2xl mx-auto p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="votre@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Votre message ici..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {btnDisabled ? <div className="text-center">Votre message a bien été envoyé !</div> : <Button type="submit">Envoyer</Button>}
            </form>
          </Form>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Autres moyens de nous contacter</h2>
          <p className="mb-2">Email: timothee.demares@alextraveylan.fr</p>
        </div>
      </div>
    </div>
  )
}
