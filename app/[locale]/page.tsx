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
      <div className="flex justify-center">
        <a
          href="https://www.producthunt.com/posts/task-equalizer?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-task&#0045;equalizer"
          target="_blank"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=479274&theme=dark"
            alt="Task&#0032;Equalizer - Track&#0032;and&#0032;balance&#0032;household&#0032;chores&#0032;with&#0032;Task&#0032;Equalizer&#0046; | Product Hunt"
            style={{ width: "250px", height: "54px" }}
            width="250"
            height="54"
          />
        </a>
      </div>
    </div>
  )
}
