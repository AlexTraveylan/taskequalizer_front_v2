"use client"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LanguagePossibles } from "@/lib/app-types"
import { familySettingsService } from "@/lib/services/family-settings"
import { useChangeLocale, useScopedI18n } from "@/locales/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

const languages: { label: string; value: LanguagePossibles }[] = [
  { label: "English", value: "en" },
  { label: "Français", value: "fr" },
  { label: "Deutsch", value: "de" },
] as const

const dictLanguages: Record<LanguagePossibles, string> = {
  en: "English",
  fr: "Français",
  de: "Deutsch",
}

export function LanguageForm({ actualLocale }: { actualLocale: LanguagePossibles }) {
  const queryClient = useQueryClient()
  const changeLocale = useChangeLocale()
  const scopedT = useScopedI18n("language-form")

  const mutation = useMutation({
    mutationFn: familySettingsService.updateLocale,
    onSuccess: (data) => {
      toast.info("Language updated")
      changeLocale(data.locale)
      queryClient.invalidateQueries({ queryKey: ["familySettings"] })
    },
    onError: () => {
      toast.error("Error while updating language")
    },
  })

  const handleChange = (newLocale: LanguagePossibles) => {
    mutation.mutate({ locale: newLocale })
  }

  return (
    <Select
      onValueChange={(newValue) => {
        handleChange(newValue as LanguagePossibles)
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={dictLanguages[actualLocale]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>{scopedT("langage-choice-label")}</SelectLabel>
          {languages.map((language) => (
            <SelectItem key={language.value} value={language.value}>
              {language.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
