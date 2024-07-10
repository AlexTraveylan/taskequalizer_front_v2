export type ImageType = {
  src: string
  alt: string
  width: number
  height: number
}

type navKeyPossible = "Home" | "Application" | "Settings"

type NavigationItem = {
  i18nKey: navKeyPossible
  href: string
  authRequired: boolean
}

export const navItems: Record<navKeyPossible, NavigationItem> = {
  Home: { i18nKey: "Home", href: "/", authRequired: false },
  Application: { i18nKey: "Application", href: "/commun/taskequalizer", authRequired: true },
  Settings: { i18nKey: "Settings", href: "/commun/settings/informations", authRequired: true },
}

type settingsKeyPossible = "Informations" | "possibleTasks" | "myAccount"

type SettingsNavigationItem = {
  i18nKey: settingsKeyPossible
  href: string
}

export const settingsNavItems: Record<settingsKeyPossible, SettingsNavigationItem> = {
  Informations: { i18nKey: "Informations", href: "/commun/settings/informations" },
  possibleTasks: { i18nKey: "possibleTasks", href: "/commun/settings/possible-tasks" },
  myAccount: { i18nKey: "myAccount", href: "/commun/settings/my-account" },
}

type authKeyPossible = "login" | "register-create" | "register-with-invitation"

type AuthNavigationItem = {
  i18nKey: authKeyPossible
  href: string
}

export const authNavItems: Record<authKeyPossible, AuthNavigationItem> = {
  login: { i18nKey: "login", href: "/auth-page/login" },
  "register-create": { i18nKey: "register-create", href: "/auth-page/register-create" },
  "register-with-invitation": { i18nKey: "register-with-invitation", href: "/auth-page/register-with-invitation" },
}

export type LanguagePossibles = "en" | "fr" | "de"

export const languages: LanguagePossibles[] = ["en", "fr", "de"]
