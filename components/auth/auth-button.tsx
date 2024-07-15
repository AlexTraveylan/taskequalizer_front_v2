"use client"

import { Button } from "@/components/ui/button"
import { authNavItems, navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const AuthButton = () => {
  const { isAuth, authState } = useIsAuth()
  const router = useRouter()
  const scopedT = useScopedI18n("auth-button")

  const handleLogout = async () => {
    localStorage.removeItem("auth_token")
    authState(false)
    router.push(navItems["Home"].href)
  }

  if (isAuth) {
    return <Button onClick={handleLogout}>{scopedT("logoutButtonLabel")}</Button>
  }

  return (
    <Link href={authNavItems["login"].href} passHref>
      <Button variant={"default"}>{scopedT("loginButtonLabel")}</Button>
    </Link>
  )
}
