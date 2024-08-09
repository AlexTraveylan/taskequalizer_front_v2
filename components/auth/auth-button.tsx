"use client"

import { Button } from "@/components/ui/button"
import { authNavItems, navItems } from "@/lib/app-types"
import { useClientMember } from "@/lib/whoiam-store"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export const AuthButton = () => {
  const { clientMember, cleanClientMember } = useClientMember()
  const router = useRouter()
  const scopedT = useScopedI18n("auth-button")

  const handleLogout = async () => {
    localStorage.removeItem("auth_token")
    cleanClientMember()
    router.push(navItems["Home"].href)
  }

  if (clientMember !== null) {
    return <Button onClick={handleLogout}>{scopedT("logoutButtonLabel")}</Button>
  }

  return (
    <Link href={authNavItems["login"].href} passHref>
      <Button variant={"default"}>{scopedT("loginButtonLabel")}</Button>
    </Link>
  )
}
