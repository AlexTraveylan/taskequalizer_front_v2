import { Button } from "@/components/ui/button"
import { getScopedI18n } from "@/locales/server"
import { Check } from "lucide-react"
import Image from "next/image"

export const BelowTheFold = async () => {
  const scopedT = await getScopedI18n("below-the-fold")

  return (
    <div className="min-h-screen bg-primary-foreground rounded p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">{scopedT("title")}</h1>
        <h2 className="text-2xl">{scopedT("description")}</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-center mb-16">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">{scopedT("list.title")}</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-x-3">
              <Check className="text-green-800" strokeWidth={1.4} />
              {scopedT("list.item1")}
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-green-800" strokeWidth={1.4} />
              {scopedT("list.item2")}
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-green-800" strokeWidth={1.4} />
              {scopedT("list.item3")}
            </li>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image src="/images/couple_landing_page.png" alt="Illustration du concept" className="w-full h-auto" width={600} height={400} />
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-center">{scopedT("how-it-works.title")}</h3>
        <p className="text-center mb-8">
          {scopedT("how-it-works.description1")}
          <br />
          {scopedT("how-it-works.description2")}
          <br />
          {scopedT("how-it-works.description3")}
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="flex flex-col justify-between items-center rounded-lg shadow-md p-5">
            <Image width={300} height={200} src="/images/time_tasks.png" alt="Graphique de répartition des tâches" className="h-52" />
            <p className="mt-4">{scopedT("how-it-works.graph1")}</p>
          </div>
          <div className="flex flex-col justify-between items-center rounded-lg shadow-md p-5">
            <Image width={300} height={200} src="/images/time_bar_tasks.png" alt="Évolution hebdomadaire" className="h-52" />
            <p className="mt-4">{scopedT("how-it-works.graph2")}</p>
          </div>
          <div className="flex flex-col justify-between items-center rounded-lg shadow-md p-5">
            <Image width={300} height={200} src="/images/curve_time.png" alt="Temps par tâche" className="h-52" />
            <p className="mt-4">{scopedT("how-it-works.graph2")}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-semibold mb-4">{scopedT("cta.title")}</h3>
        <p className="text-xl mb-6">{scopedT("cta.description")}</p>
        <Button size="lg" className="px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
          {scopedT("cta.button")}
        </Button>
      </div>
    </div>
  )
}
