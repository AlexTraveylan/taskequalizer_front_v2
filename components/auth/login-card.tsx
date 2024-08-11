"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginUrl } from "@/lib/api-setting"
import { navItems } from "@/lib/app-types"
import { authResponseSchema, loginSchema } from "@/lib/schema/auth"
import { invitationService } from "@/lib/services/invitation"
import { taskService } from "@/lib/services/task"
import { useClientMember } from "@/lib/whoiam-store"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { InputEye } from "../ui/input-password-eye"
import { ForgetPasswordLink } from "./forget-password-link"

export function LoginForm() {
  const { fetchClientMember } = useClientMember()
  const router = useRouter()
  const scopedT = useScopedI18n("login-card")
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onChange",
  })

  const onSubmit = async (formData: z.infer<typeof loginSchema>) => {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
      await taskService.cleanInvalidTasks()
      await invitationService.cleanInvalidInvitations()
    } catch (error) {
      toast.error(scopedT("error-message"))
    }
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{scopedT("usernameField")}</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{scopedT("passwordField")}</FormLabel>
                    <ForgetPasswordLink form={form} />
                  </div>
                  <FormControl>
                    <InputEye {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {scopedT("buttonLabel")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
