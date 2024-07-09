export type ImageType = {
  src: string
  alt: string
  width: number
  height: number
}

export type NavigationItem = {
  label: Map<string, string>
  href: string
  ariaLabel: Map<string, string>
  authRequired: boolean
}

export type NavigationSettingsItem = {
  i18nKey: string
  href: string
  i18nAriaKey: string
}

export type LanguagePossibles = "en" | "fr" | "de"

export const languages: LanguagePossibles[] = ["en", "fr", "de"]
