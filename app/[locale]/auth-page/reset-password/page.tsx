"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { InputEye } from "@/components/ui/input-password-eye"
import { updatePasswordUrl } from "@/lib/api-setting"
import { authNavItems } from "@/lib/app-types"
import { ResetPassword, resetPasswordSchema } from "@/lib/schema/auth"
import { useClientMember } from "@/lib/whoiam-store"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export default function ResetPasswordPage() {
  const router = useRouter()
  const scopedT = useScopedI18n("reset-password")
  const searchParams = useSearchParams()
  const reset_token = searchParams.get("reset_token")
  const user_pk = searchParams.get("user_pk")

  const form = useForm<ResetPassword>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      new_password: "",
    },
  })

  const onSubmit = async (formData: ResetPassword) => {
    if (!reset_token) {
      return
    }

    const response = await fetch(updatePasswordUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, reset_token, user_pk }),
    })

    if (!response.ok) {
      toast.error(scopedT("error-message"))
      return
    }

    toast.success(scopedT("success-message"))
    router.push(authNavItems["login"].href)
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("passwordField")}</FormLabel>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={!reset_token}>
              {scopedT("buttonLabel")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
