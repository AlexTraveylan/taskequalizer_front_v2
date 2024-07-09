"use client"

import { LanguagePossibles } from "@/lib/app-types"
import type { ReactNode } from "react"
import { I18nProviderClient } from "../../locales/client"

type ProviderProps = {
  locale: LanguagePossibles
  children: ReactNode
}

export function Provider({ locale, children }: ProviderProps) {
  return (
    <I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
      {children}
    </I18nProviderClient>
  )
}
