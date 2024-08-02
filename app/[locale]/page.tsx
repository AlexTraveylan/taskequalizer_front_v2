import { BelowTheFold } from "@/components/landing-page/below-the-fold"
import { LanguagePossibles } from "@/lib/app-types"

export default async function Home({ params: { locale } }: { params: { locale: LanguagePossibles } }) {
  return (
    <div>
      <BelowTheFold />
    </div>
  )
}
