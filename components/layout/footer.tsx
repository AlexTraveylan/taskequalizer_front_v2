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
            <h5 className="font-bold text-lg mb-4">{scopedT("about.title")}</h5>
            <p className="text-sm text-muted-foreground">{scopedT("about")}</p>
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">{scopedT("fast-link")}</h5>
            <FooterFastLink />
          </div>
          <div>
            <h5 className="font-bold text-lg mb-4">{scopedT("support")}</h5>
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
            <h5 className="font-bold text-lg mb-4">{scopedT("follow-me")}</h5>
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
          <p>{scopedT("copy")}</p>
        </div>
      </div>
    </footer>
  )
}
