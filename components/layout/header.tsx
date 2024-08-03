"use client"

import { navItems } from "@/lib/app-types"
import { useIsAuth } from "@/lib/auth-store"
import { Member } from "@/lib/schema/member"
import { familyService } from "@/lib/services/family"
import { memberService } from "@/lib/services/member"
import { useScopedI18n } from "@/locales/client"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AuthButton } from "../auth/auth-button"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"

export const Header = () => {
  const t = useScopedI18n("header")
  const { isAuth, authState } = useIsAuth()
  const [member, setMember] = useState<Member | null>(null)

  async function getMemberId() {
    try {
      const mmyId = await memberService.whoIam()
      const members = await familyService.getFamilyMembers()
      const member = members.find((m) => m.id === mmyId.member_id)
      if (member) {
        setMember(member)
      }
    } catch (e) {
      authState(false)
      return
    }
    authState(true)
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
      <div className="flex gap-5 items-center justify-center">
        {member && (
          <span className="text-muted-foreground">
            {t("welcome")} {member.member_name}
          </span>
        )}
        <AuthButton />
      </div>
    </header>
  )
}
