"use client"

import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { useClientMember } from "@/lib/whoiam-store"
import { useScopedI18n } from "@/locales/client"
import Image from "next/image"
import Link from "next/link"
import { useEffect } from "react"
import { AuthButton } from "../auth/auth-button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"

export const Header = () => {
  const t = useScopedI18n("header")
  const { clientMember, fetchClientMember } = useClientMember()

  useEffect(() => {
    fetchClientMember()
  }, [])

  return (
    <header className="flex flex-wrap gap-2 justify-evenly py-2 bg-primary-foreground">
      <Image src="/favicon.ico" alt="logo" width={40} height={40} />
      <NavigationMenu>
        <NavigationMenuList>
          {Object.values(navItems)
            .filter((item) => !item.authRequired || clientMember !== null)
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
      <div className="flex gap-5 items-center justify-center">
        {clientMember && (
          <span className="text-muted-foreground">
            {t("welcome")} {clientMember.member_name}
          </span>
        )}
        <AuthButton />
      </div>
    </header>
  )
}
