"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUrl } from "@/lib/api-setting"
import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { authResponseSchema } from "@/lib/schema/auth"
import { useScopedI18n } from "@/locales/client"
import { useRouter } from "next/navigation"

export function RegisterForm() {
  const { authState } = useIsAuth()
  const router = useRouter()
  const scopedT = useScopedI18n("register-card")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = form.get("username") as string
    const familyName = form.get("familyName") as string
    const password = form.get("password") as string

    if (!username || !familyName || !password) {
      return
    }

    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        family_name: familyName,
        password: password,
      }),
    })

    if (!response.ok) {
      console.log("Error: ", response.status)
    }

    const data = await response.json()

    try {
      const parsedData = authResponseSchema.parse(data)
      if (!parsedData.auth_token) {
        console.log(parsedData.message)
        return
      }

      localStorage.setItem("auth_token", data.auth_token)
      authState(true)
      router.push(navItems["Application"].href)
    } catch (error) {
      console.log("Error parsing data")
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">{scopedT("title")}</CardTitle>
        <CardDescription>{scopedT("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">{scopedT("usernameField")}</Label>
              <Input id="username" name="username" type="text" placeholder="Alex006" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="familyName">{scopedT("familyNameField")}</Label>
              <Input id="familyName" name="familyName" type="text" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">{scopedT("passwordField")}</Label>
              <Input id="password" name="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              {scopedT("buttonLabel")}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
