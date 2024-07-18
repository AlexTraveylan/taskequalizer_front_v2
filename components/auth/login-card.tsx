"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginUrl } from "@/lib/api-setting"
import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { authResponseSchema, loginSchema } from "@/lib/schema/auth"
import { taskService } from "@/lib/services/task"
import { useScopedI18n } from "@/locales/client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { InputEye } from "../ui/input-password-eye"

export function LoginForm() {
  const { authState } = useIsAuth()
  const router = useRouter()
  const scopedT = useScopedI18n("login-card")
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const [initialized, setInitialized] = useState(false)
  const usernameRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!initialized && usernameRef.current?.value && passwordRef.current?.value) {
      form.setValue("username", usernameRef.current.value)
      form.setValue("password", passwordRef.current.value)
      setInitialized(true)
    }
  }, [initialized, form])

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
      authState(true)
      toast.success(scopedT("success-message"))
      router.push(navItems["Application"].href)
      await taskService.cleanInvalidTasks()
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
                    <Input placeholder="John Doe" {...field} autoComplete="username" ref={usernameRef} />
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
                  <FormLabel>{scopedT("passwordField")}</FormLabel>
                  <FormControl>
                    <InputEye {...field} autoComplete="current-password" ref={passwordRef} />
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
