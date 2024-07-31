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

export function generatePastDates(days: number = 90): string[] {
  const dates: string[] = []
  const today = new Date()

  for (let i = 0; i < days; i++) {
    const pastDate = new Date(today)
    pastDate.setDate(today.getDate() - i)

    const year = pastDate.getFullYear()
    const month = String(pastDate.getMonth() + 1).padStart(2, "0")
    const day = String(pastDate.getDate()).padStart(2, "0")

    dates.push(`${year}-${month}-${day}`)
  }

  return dates
}
