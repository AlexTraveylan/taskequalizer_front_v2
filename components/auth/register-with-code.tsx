"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { registerUrl } from "@/lib/api-setting"
import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
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

    const response = await fetch(registerUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        invitation_code: invitationCode,
        password: password,
      }),
      credentials: "include",
    })

    if (response.ok) {
      console.log("User registered")
      authState(true)
      router.push(navItems["Application"].href)
    } else if (response.status === 400) {
      console.log("User already exists")
    } else {
      console.log("error")
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
