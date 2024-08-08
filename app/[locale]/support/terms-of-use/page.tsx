import { getCurrentLocale, getScopedI18n } from "@/locales/server"

export default async function TermsOfUsePage() {
  const scopedT = await getScopedI18n("terms-of-use")
  const locale = getCurrentLocale()

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">{scopedT("title")}</h1>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. {scopedT("accept.title")}</h2>
            <p>{scopedT("accept.part1")}</p>
            <p>{scopedT("accept.part2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. {scopedT("description.title")}</h2>
            <p>{scopedT("description.part1")}</p>
            <p>{scopedT("description.part2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. {scopedT("responsability.title")}</h2>
            <p>{scopedT("responsability.part1")}</p>
            <p>{scopedT("responsability.part2")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. {scopedT("usage.title")}</h2>
            <p>{scopedT("usage.part")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. {scopedT("rights.title")}</h2>
            <p>{scopedT("rights.part")}</p>
            <ul className="list-disc list-inside ml-4">
              <li>{scopedT("rights.part1")}</li>
              <li>{scopedT("rights.part2")}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. {scopedT("limit.title")}</h2>
            <p>{scopedT("limit.part")}</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. {scopedT("modif.title")}</h2>
            <p>{scopedT("modif.part")}</p>
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
