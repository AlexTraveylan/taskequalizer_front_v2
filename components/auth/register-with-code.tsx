"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessageI18n } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { registerInvitationUrl } from "@/lib/api-setting"
import { navItems } from "@/lib/app-types"
import { authResponseSchema, registerInviteSchema } from "@/lib/schema/auth"
import { useClientMember } from "@/lib/whoiam-store"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { InputEye } from "../ui/input-password-eye"
import { RegisterFormFooter } from "./register-form-footer"

export function RegisterWithCodeForm() {
  const { fetchClientMember } = useClientMember()
  const router = useRouter()
  const searchParams = useSearchParams()
  const param_code = searchParams.get("code")
  const scopedT = useScopedI18n("register-invitation")
  const form = useForm<z.infer<typeof registerInviteSchema>>({
    resolver: zodResolver(registerInviteSchema),
    defaultValues: {
      username: "",
      invitation_code: param_code || "",
      password: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof registerInviteSchema>) => {
    const response = await fetch(registerInvitationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      toast.error(scopedT("error-message"))
      return
    }

    const responseData = await response.json()

    try {
      const parsedData = authResponseSchema.parse(responseData)
      if (!parsedData.auth_token) {
        toast.error(scopedT("error-message"))
        return
      }

      localStorage.setItem("auth_token", parsedData.auth_token)
      fetchClientMember()
      toast.success(scopedT("success-message"))
      router.push(navItems["Application"].href)
    } catch (error) {
      toast.error(scopedT("error-message"))
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("usernameField")}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invitation_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("invitationCodeField")}</FormLabel>
                  <FormControl>
                    <Input placeholder="A1B2C3D4" {...field} />
                  </FormControl>
                  <FormMessageI18n />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
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
            <Button type="submit" className="w-full">
              {scopedT("buttonLabel")}
            </Button>
          </form>
        </Form>
      </CardContent>
      <RegisterFormFooter />
    </Card>
  )
}
