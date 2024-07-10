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
  Application: { i18nKey: "Application", href: "/taskequalizer", authRequired: true },
  Settings: { i18nKey: "Settings", href: "/settings", authRequired: true },
}

type authKeyPossible = "login" | "register-create" | "register-with-invitation"

export type AuthNavigationItem = {
  i18nKey: authKeyPossible
  href: string
  authRequired: boolean
}

export type NavigationSettingsItem = {
  i18nKey: string
  href: string
  i18nAriaKey: string
}

export type LanguagePossibles = "en" | "fr" | "de"

export const languages: LanguagePossibles[] = ["en", "fr", "de"]
