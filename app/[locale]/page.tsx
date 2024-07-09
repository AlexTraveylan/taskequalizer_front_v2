import { getCurrentLocale, getI18n } from "../../locales/server"

export default async function ({ params: { locale } }: { params: { locale: string } }) {
  const t = await getI18n()

  const currentLocale = getCurrentLocale()
  return (
    <div>
      <h1>{t("hello")}</h1>
      <p>{`-> ${currentLocale}`}</p>
    </div>
  )
}
