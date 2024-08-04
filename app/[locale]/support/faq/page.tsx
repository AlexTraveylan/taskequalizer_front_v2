"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { footerSupportItems } from "@/lib/app-types"
import Link from "next/link"

export default function FAQPage() {
  const faqs = [
    {
      question: "Comment fonctionne l'application pour équilibrer les tâches ménagères ?",
      answer:
        "Notre application permet à chaque membre du couple d'enregistrer les tâches ménagères qu'il effectue. L'application analyse ensuite ces données pour fournir des statistiques et des visualisations claires de la répartition des tâches, encourageant ainsi un équilibre naturel.",
    },
    {
      question: "Est-ce que l'application est gratuite ?",
      answer:
        "Nous offrons une version gratuite avec des fonctionnalités de base. Une version premium avec des fonctionnalités avancées est également disponible pour un abonnement mensuel ou annuel.",
    },
    {
      question: "Comment puis-je ajouter une tâche ménagère ?",
      answer:
        "Pour ajouter une tâche, ouvrez l'application, cliquez sur le bouton '+' en bas de l'écran, sélectionnez le type de tâche dans la liste ou créez une nouvelle catégorie, puis entrez les détails comme la durée et la fréquence.",
    },
    {
      question: "Puis-je personnaliser les catégories de tâches ?",
      answer:
        "Oui, vous pouvez créer des catégories personnalisées pour les tâches spécifiques à votre foyer. Allez dans les paramètres de l'application et sélectionnez 'Gérer les catégories' pour ajouter, modifier ou supprimer des catégories.",
    },
    {
      question: "L'application est-elle disponible sur iOS et Android ?",
      answer:
        "Oui, notre application est disponible sur les deux plateformes. Vous pouvez la télécharger depuis l'App Store pour iOS ou le Google Play Store pour Android.",
    },
    {
      question: "Comment sont protégées mes données personnelles ?",
      answer:
        "Nous prenons la protection de vos données très au sérieux. Toutes les informations sont cryptées et stockées de manière sécurisée. Nous ne partageons jamais vos données personnelles avec des tiers. Pour plus de détails, consultez notre politique de confidentialité.",
    },
    {
      question: "Que faire si mon partenaire ne veut pas utiliser l'application ?",
      answer:
        "Notre application est conçue pour être utilisée idéalement par les deux partenaires, mais elle peut aussi être utile si un seul membre du couple l'utilise. Vous pouvez toujours suivre vos propres tâches et utiliser les statistiques comme base de discussion avec votre partenaire.",
    },
    {
      question: "Comment puis-je contacter le support client ?",
      answer:
        "Vous pouvez nous contacter via la page 'Contact' de notre site web, ou directement depuis l'application en allant dans 'Paramètres' > 'Support'. Nous nous efforçons de répondre à toutes les demandes dans un délai de 24 heures.",
    },
  ]

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center">Foire Aux Questions (FAQ)</h1>

        <div className="max-w-3xl mx-auto p-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Vous n'avez pas trouvé la réponse à votre question ?{" "}
            <Link href={footerSupportItems.Contact.href} className="text-primary hover:underline">
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
