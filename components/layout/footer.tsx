import { footerSupportItems } from "@/lib/app-types"
import { Github, Linkedin, Twitter } from "lucide-react"
import { getScopedI18n } from "../../locales/server"
import { FooterFastLink } from "./footer-fast-link"

export const Footer = async () => {
  const scopedT = await getScopedI18n("footer")

  return (
    <footer className="bg-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h5 className="font-bold text-lg mb-4">À propos</h5>
            <p className="text-sm text-muted-foreground">
              La mission de Task Equalizer est d'aider les couples à trouver l'harmonie dans leur vie quotidienne en équilibrant les tâches
              ménagères.
            </p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Liens rapides</h5>
            <FooterFastLink />
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Support</h5>
            <ul className="space-y-2">
              {Object.values(footerSupportItems).map((item, index) => (
                <li key={`footer-support-item-${index}`}>
                  <a href={item.href} className="text-muted-foreground transition-colors hover:text-primary">
                    {scopedT(item.i18nKey)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">Suivez-moi</h5>
            <div className="flex space-x-4">
              <a href="https://x.com/DemaresTim" className="hover:text-blue-300 transition-colors" target="_blank">
                <Twitter />
              </a>
              <a href="https://www.linkedin.com/in/tdemares/" className="hover:text-blue-800 transition-colors" target="_blank">
                <Linkedin />
              </a>
              <a href="https://github.com/AlexTraveylan" className="hover:text-purple-800 transition-colors" target="_blank">
                <Github />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-primary text-center">
          <p>&copy; 2024 Task Equalizer. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
