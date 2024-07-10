"use client"

import { NavigationItem } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { AuthButton } from "../auth/auth-button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"

const nav: NavigationItem[] = [
  { i18nKey: "Home", href: "/", authRequired: false },
  { i18nKey: "Application", href: "/taskequalizer", authRequired: true },
  { i18nKey: "Settings", href: "/settings", authRequired: true },
]

export const Header = () => {
  const t = useScopedI18n("header")
  const { isAuth } = useIsAuth()

  return (
    <header className="flex gap-2 justify-evenly py-2 bg-primary-foreground">
      <NavigationMenu>
        <NavigationMenuList>
          {nav
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
