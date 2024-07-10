import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { AuthNavigationItem } from "@/lib/app-types"
import { getCurrentLocale, getScopedI18n } from "@/locales/server"
import Link from "next/link"
import { Provider } from "../provider"

const nav: AuthNavigationItem[] = [
  { i18nKey: "login", href: "/auth-page/login", authRequired: false },
  { i18nKey: "register-create", href: "/auth-page/register-create", authRequired: true },
  { i18nKey: "register-with-invitation", href: "/auth-page/register-with-invitation", authRequired: true },
]

export default async function LayoutAuthPage({ children }: { children: React.ReactNode }) {
  const t = await getScopedI18n("auth-page")
  const locale = getCurrentLocale()
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
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
      </div>
      <Provider locale={locale}>{children}</Provider>
    </div>
  )
}
