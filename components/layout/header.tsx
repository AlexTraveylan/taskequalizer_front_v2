import { NavigationItem } from "@/lib/app-types"
import { getScopedI18n } from "@/locales/server"
import Link from "next/link"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "../ui/navigation-menu"

const nav: NavigationItem[] = [
  { i18nKey: "Home", href: "/", authRequired: false },
  { i18nKey: "Application", href: "/taskequalizer", authRequired: true },
  { i18nKey: "Settings", href: "/settings", authRequired: true },
]

export const Header = async () => {
  const t = await getScopedI18n("header")

  return (
    <header>
      <NavigationMenu>
        <NavigationMenuList>
          {nav.map((item, index) => {
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
    </header>
  )
}
