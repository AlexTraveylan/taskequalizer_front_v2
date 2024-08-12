"use client"

import { familySettingsService } from "@/lib/services/family-settings"
import { useScopedI18n } from "@/locales/client"
import { useQuery } from "@tanstack/react-query"
import { LanguageForm } from "./langage-form"

export default function FamilySettings() {
  const { data, isError, isLoading } = useQuery({ queryKey: ["familySettings"], queryFn: familySettingsService.getFamilySettings })
  const scopedT = useScopedI18n("family-settings")

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  if (!data) {
    return <div>No data...</div>
  }

  return (
    <div className="flex justify-between items-center w-full">
      <h2>
        {scopedT("plan")} : {data.subscription_plan}
      </h2>
      <LanguageForm actualLocale={data.locale} />
    </div>
  )
}
