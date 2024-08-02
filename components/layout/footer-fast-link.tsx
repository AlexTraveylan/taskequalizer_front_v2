"use client"

import { useIsAuth } from "@/lib/auth-store"
import { useScopedI18n } from "@/locales/client"

type NavItem = {
  i18nKey: string
  href: string
}

type footerNavKey = "Home" | "possibleTasks" | "currentTask" | "ranking" | "login" | "register-create" | "register-with-invitation"
type footerNavKeyPossibleLogged = "Home" | "possibleTasks" | "currentTask" | "ranking"
type footerNavKeyPossibleNotLogged = "Home" | "login" | "register-create" | "register-with-invitation"

const footerSupportItemsLogged: Record<footerNavKeyPossibleLogged, NavItem> = {
  Home: { i18nKey: "Home", href: "/" },
  possibleTasks: { i18nKey: "possibleTasks", href: "/commun/settings/possible-tasks" },
  currentTask: { i18nKey: "currentTask", href: "/commun/taskequalizer/currentTask" },
  ranking: { i18nKey: "ranking", href: "/commun/taskequalizer/ranking" },
}

const footerSupportItemsNotLogged: Record<footerNavKeyPossibleNotLogged, NavItem> = {
  Home: { i18nKey: "Home", href: "/" },
  login: { i18nKey: "login", href: "/auth-page/login" },
  "register-create": { i18nKey: "register-create", href: "/auth-page/register-create" },
  "register-with-invitation": { i18nKey: "register-with-invitation", href: "/auth-page/register-with-invitation" },
}

export const FooterFastLink = () => {
  const { isAuth } = useIsAuth()
  const scopedT = useScopedI18n("footer-fast-link")

  // If the user is authenticated, we display the following links
  if (isAuth) {
    return (
      <ul className="space-y-2">
        {Object.values(footerSupportItemsLogged).map((item, index) => (
          <li key={`logged-footer-support-item-${index}`}>
            <a href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
              {scopedT(item.i18nKey as footerNavKey)}
            </a>
          </li>
        ))}
      </ul>
    )
  }

  // If the user is not authenticated
  return (
    <ul className="space-y-2">
      {Object.values(footerSupportItemsNotLogged).map((item, index) => (
        <li key={`not-logged-footer-support-item-${index}`}>
          <a href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
            {scopedT(item.i18nKey as footerNavKey)}
          </a>
        </li>
      ))}
    </ul>
  )
}
