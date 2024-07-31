"use client"

import { familySettingsService } from "@/lib/services/family-settings"
import { useChangeLocale } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"

export const SetLangageComponent = ({ children }: { children: React.ReactNode }) => {
  const changeLocale = useChangeLocale()
  const { data } = useQuery({ queryKey: ["familySettings"], queryFn: familySettingsService.getFamilySettings })

  useEffect(() => {
    if (data) {
      changeLocale(data.locale)
    }
  }, [data])

  return <>{children}</>
}
