import { AboveTheFold } from "@/components/landing-page/above-the-fold"
import { BelowTheFold } from "@/components/landing-page/below-the-fold"
import { LanguagePossibles } from "@/lib/app-types"
import { getI18n } from "../../locales/server"

export default async function Home({ params: { locale } }: { params: { locale: LanguagePossibles } }) {
  const t = await getI18n()

  return (
    <div>
      <BelowTheFold />
      <AboveTheFold />
    </div>
  )
}
