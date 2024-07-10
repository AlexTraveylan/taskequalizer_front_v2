export type ImageType = {
  src: string
  alt: string
  width: number
  height: number
}

type navKeyPossible = "Home" | "Application" | "Settings"

export type NavigationItem = {
  i18nKey: navKeyPossible
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
