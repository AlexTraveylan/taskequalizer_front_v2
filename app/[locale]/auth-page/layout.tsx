import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { authNavItems } from "@/lib/app-types"
import { getCurrentLocale, getScopedI18n } from "@/locales/server"
import Link from "next/link"
import { Toaster } from "sonner"
import { Provider } from "../provider"

export default async function LayoutAuthPage({ children }: { children: React.ReactNode }) {
  const t = await getScopedI18n("auth-page")
  const locale = getCurrentLocale()
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-center">
        <NavigationMenu>
          <NavigationMenuList className="flex flex-wrap">
            {Object.values(authNavItems).map((item, index) => {
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
      <Provider locale={locale}>
        <Toaster richColors position="top-left" />
        {children}
      </Provider>
    </div>
  )
}
