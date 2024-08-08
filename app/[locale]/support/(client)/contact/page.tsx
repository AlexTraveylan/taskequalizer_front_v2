"use client"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { EmailContact, emailContactSchema } from "@/lib/schema/email"
import { emailService } from "@/lib/services/email"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"

export default function ContactPage() {
  const [btnDisabled, setBtnDisabled] = useState(false)
  const scopedT = useScopedI18n("contact")

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
        <h1 className="text-3xl font-bold mb-8 text-center">{scopedT("title")}</h1>

        <div className="max-w-2xl mx-auto p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{scopedT("email.label")}</FormLabel>
                    <FormControl>
                      <Input placeholder={scopedT("email.placeholder")} {...field} />
                    </FormControl>
                    <FormMessageI18n />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{scopedT("message.label")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={scopedT("message.placeholder")} {...field} />
                    </FormControl>
                    <FormMessageI18n />
                  </FormItem>
                )}
              />
              {btnDisabled ? (
                <div className="text-center">{scopedT("btn.label.succes")}</div>
              ) : (
                <Button type="submit">{scopedT("btn.label")}</Button>
              )}
            </form>
          </Form>
        </div>

        <div className="mt-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">{scopedT("othersWay")}</h2>
          <p className="mb-2">{scopedT("email.label")}: timothee.demares@alextraveylan.fr</p>
        </div>
      </div>
    </div>
  )
}
