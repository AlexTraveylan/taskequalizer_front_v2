import { BelowTheFold } from "@/components/landing-page/below-the-fold"
import { Share } from "@/components/landing-page/twittershare"
import { LanguagePossibles } from "@/lib/app-types"
import { getScopedI18n } from "@/locales/server"

export default async function Home({ params: { locale } }: { params: { locale: LanguagePossibles } }) {
  const scopedT = await getScopedI18n("home")

  return (
    <div className="flex flex-col gap-8">
      <BelowTheFold />
      <Share shareText={scopedT("share")} shareTitle={scopedT("share-title")} />
    </div>
  )
}
