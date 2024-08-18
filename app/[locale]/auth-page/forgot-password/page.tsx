"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EmailRecovery, emailRecoverySchema } from "@/lib/schema/email"
import { emailService } from "@/lib/services/email"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

const ForgotPasswordForm: FC = () => {
  const [isWaiting, setIsWaiting] = useState(false)
  const scopedT = useScopedI18n("forgot-password")

  const form = useForm<EmailRecovery>({
    resolver: zodResolver(emailRecoverySchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: EmailRecovery) => {
    if (isWaiting) {
      return
    }

    setIsWaiting(true)
    const timer = setTimeout(() => {
      setIsWaiting(false)
    }, 30000)
    try {
      await emailService.sendResetPasswordRequest(values.email)
      toast.success(scopedT("toast.success"))
    } catch (error) {
      toast.error(scopedT("toast.error"))
    }
    return timer
  }

  return (
    <Card className="mx-auto max-w-sm my-5">
      <CardHeader>
        <CardTitle>{scopedT("title")}</CardTitle>
      </CardHeader>
      <CardContent>
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
            <Button type="submit" disabled={isWaiting}>
              {isWaiting ? scopedT("wait") : scopedT("ok")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export default ForgotPasswordForm
