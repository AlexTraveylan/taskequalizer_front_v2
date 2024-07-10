import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { LanguagePossibles } from "./app-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(dateTime: string, locale: LanguagePossibles) {
  const date = new Date(dateTime)
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
  return date.toLocaleDateString(locale, options)
}
