import { LanguagePossibles } from "@/lib/app-types"
import { getI18n } from "../../locales/server"

export default async function Home({ params: { locale } }: { params: { locale: LanguagePossibles } }) {
  const t = await getI18n()

  return (
    <div>
      <h1>{t("hello")}</h1>
      <p>{`-> ${locale}`}</p>
    </div>
  )
}
