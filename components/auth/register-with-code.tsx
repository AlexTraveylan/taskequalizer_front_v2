"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerInvitationUrl } from "@/lib/api-setting"
import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { authResponseSchema } from "@/lib/schema/auth"
import { useScopedI18n } from "@/locales/client"
import { useRouter } from "next/navigation"

export function RegisterWithCodeForm() {
  const { authState } = useIsAuth()
  const router = useRouter()
  const scopedT = useScopedI18n("register-invitation")

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const username = form.get("username")
    const invitationCode = form.get("invitationCode")
    const password = form.get("password")

    if (!username || !invitationCode || !password) {
      return
    }

    const response = await fetch(registerInvitationUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        invitation_code: invitationCode,
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
              <Label htmlFor="invitationCode">{scopedT("invitationCodeField")}</Label>
              <Input id="invitationCode" placeholder="A1B2C3D4" name="invitationCode" type="text" required />
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
