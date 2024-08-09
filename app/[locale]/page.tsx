import { BelowTheFold } from "@/components/landing-page/below-the-fold"
import { Share } from "@/components/landing-page/twittershare"
import { LanguagePossibles } from "@/lib/app-types"

export default async function Home({ params: { locale } }: { params: { locale: LanguagePossibles } }) {
  return (
    <div className="flex flex-col gap-8">
      <BelowTheFold />
      <Share />
    </div>
  )
}
