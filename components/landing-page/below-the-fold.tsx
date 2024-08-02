import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import Image from "next/image"

export const BelowTheFold = () => {
  return (
    <div className="min-h-screen bg-primary-foreground rounded p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Équilibrez vos tâches ménagères en couple</h1>
        <h2 className="text-2xl">Évaluez, visualisez et atteignez naturellement l'harmonie dans votre foyer</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 items-center mb-16">
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold">Mon application vous permet de :</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-x-3">
              <Check className="text-green-800" strokeWidth={1.4} />
              Suivre facilement les tâches ménagères effectuées par chacun
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-green-800" strokeWidth={1.4} />
              Visualiser la répartition des efforts en temps réel
            </li>
            <li className="flex items-center gap-3">
              <Check className="text-green-800" strokeWidth={1.4} />
              Encourager une participation équilibrée sans confrontation
            </li>
          </ul>
        </div>
        <div className="rounded-lg overflow-hidden shadow-xl">
          <Image src="/images/couple_landing_page.png" alt="Illustration du concept" className="w-full h-auto" width={600} height={400} />
        </div>
      </div>

      <div className="mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-center">Comment ça marche ?</h3>
        <p className=" text-center mb-8">
          Notre application utilise une technologie innovante pour suivre et analyser la répartition des tâches ménagères dans votre foyer. Chaque
          membre du couple peut facilement enregistrer les tâches accomplies via notre interface intuitive. Notre algorithme intelligent convertit
          ces données en statistiques claires et objectives, permettant une prise de conscience sans confrontation.
        </p>

        <h4 className="text-xl font-semibold mb-4 text-center">Exemples de statistiques générées</h4>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-lg shadow-md overflow-hidden">
            <img
              src="https://via.placeholder.com/300x200?text=Graphique+Répartition+Tâches"
              alt="Graphique de répartition des tâches"
              className="w-full h-auto"
            />
            <p className="p-4 text-center">Répartition globale des tâches</p>
          </div>
          <div className="rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Évolution+Hebdomadaire" alt="Évolution hebdomadaire" className="w-full h-auto" />
            <p className="p-4 text-center">Évolution hebdomadaire de la participation</p>
          </div>
          <div className="rounded-lg shadow-md overflow-hidden">
            <img src="https://via.placeholder.com/300x200?text=Temps+Par+Tâche" alt="Temps par tâche" className="w-full h-auto" />
            <p className="p-4 text-center">Temps moyen consacré par tâche</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <h3 className="text-3xl font-semibold mb-4">Commencez dès maintenant à équilibrer votre vie de couple</h3>
        <p className="text-xl mb-6">Inscription gratuite en 30 secondes - Aucune carte bancaire requise</p>
        <Button size="lg" className="px-8 py-3 rounded-full text-lg font-semibold transition-colors duration-300">
          Essayer gratuitement
        </Button>
      </div>
    </div>
  )
}
