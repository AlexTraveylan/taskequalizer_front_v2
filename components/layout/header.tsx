"use client"

import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { memberService } from "@/lib/services/member"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { AuthButton } from "../auth/auth-button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"

export const Header = () => {
  const t = useScopedI18n("header")
  const { isAuth, authState } = useIsAuth()
  const router = useRouter()

  async function getMemberId() {
    try {
      await memberService.whoIam()
    } catch (e) {
      authState(false)
      return
    }
    authState(true)
    router.push(navItems["Home"].href)
  }

  useEffect(() => {
    getMemberId()
  }, [])

  return (
    <header className="flex flex-wrap gap-2 justify-evenly py-2 bg-primary-foreground">
      <NavigationMenu>
        <NavigationMenuList>
          {Object.values(navItems)
            .filter((item) => !item.authRequired || isAuth)
            .map((item, index) => {
              return (
                <NavigationMenuItem key={`${index}${item.i18nKey}`}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t(item.i18nKey)}</NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              )
            })}
        </NavigationMenuList>
      </NavigationMenu>
      <AuthButton />
    </header>
  )
}
