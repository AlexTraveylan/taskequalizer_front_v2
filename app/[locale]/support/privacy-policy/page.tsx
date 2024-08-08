import { getCurrentLocale, getScopedI18n } from "@/locales/server"

export default async function PrivacyPolicyPage() {
  const scopedT = await getScopedI18n("privacy-policy")
  const locale = getCurrentLocale()

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{scopedT("title")}</h1>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. {scopedT("intro.title")}</h2>
            <p>{scopedT("intro.part1")}</p>
            <p>{scopedT("intro.part2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. {scopedT("collected.title")}</h2>
            <p>{scopedT("collected.part")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{scopedT("collected.part1")}</li>
              <li>{scopedT("collected.part2")}</li>
              <li>{scopedT("collected.part3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. {scopedT("how-used.title")}</h2>
            <p>{scopedT("how-used.part")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{scopedT("how-used.part1")}</li>
              <li>{scopedT("how-used.part2")}</li>
              <li>{scopedT("how-used.part3")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. {scopedT("shared.title")}</h2>
            <p>{scopedT("shared.part1")}</p>
            <p>{scopedT("shared.part2")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{scopedT("shared.part3")}</li>
              <li>{scopedT("shared.part5")}</li>
              <li>{scopedT("shared.part6")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. {scopedT("security.title")}</h2>
            <p>{scopedT("security.part")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. {scopedT("rights.title")}</h2>
            <p>{scopedT("rights.part1")}</p>
            <p>{scopedT("rights.part2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. {scopedT("modify.title")}</h2>
            <p>{scopedT("modify.part1")}</p>
            <p>{scopedT("modify.part2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. {scopedT("contact.title")}</h2>
            <p>{scopedT("contact.part")}</p>
          </section>
        </div>

        <div className="mt-8 text-center ">
          {scopedT("last-update")} : {new Date("09/08/2024").toLocaleDateString(locale)}
        </div>
      </div>
    </div>
  )
}
