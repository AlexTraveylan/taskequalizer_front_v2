import { getScopedI18n } from "@/locales/server"

export default async function TermsOfUsePage() {
  const scopedT = await getScopedI18n("terms-of-use")
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Conditions d'utilisation</h1>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptation des conditions</h2>
            <p className="">
              En accédant et en utilisant TaskEqualizer, vous acceptez d'être lié par ces conditions d'utilisation. Si vous n'acceptez pas ces
              conditions, veuillez ne pas utiliser notre service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Description du service</h2>
            <p className="">
              TaskEqualizer est un outil conçu pour aider les couples à équilibrer leurs tâches ménagères. Notre service permet de suivre, analyser
              et visualiser la répartition des tâches au sein du foyer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Inscription et sécurité du compte</h2>
            <p className="">
              Pour utiliser notre service, vous devez créer un compte. Vous êtes responsable de maintenir la confidentialité de vos informations de
              connexion et de toutes les activités qui se produisent sous votre compte.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Utilisation appropriée</h2>
            <p className="">
              Vous acceptez d'utiliser TaskEqualizer uniquement à des fins légales et d'une manière qui ne porte pas atteinte aux droits d'autrui
              ou ne restreint pas leur utilisation du service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Propriété intellectuelle</h2>
            <p className="">
              Tout le contenu présent sur TaskEqualizer, y compris mais sans s'y limiter, les textes, graphiques, logos, icônes, images, clips
              audio, téléchargements numériques et compilations de données, est la propriété de Timothée Demares et est protégé par les lois sur le
              droit d'auteur.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Limitation de responsabilité</h2>
            <p className="">
              Timothée Demares ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de
              l'utilisation ou de l'impossibilité d'utiliser notre service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Modifications des conditions</h2>
            <p className="">
              Nous nous réservons le droit de modifier ces conditions d'utilisation à tout moment. Les modifications entreront en vigueur dès leur
              publication sur cette page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact</h2>
            <p className="">
              Si vous avez des questions concernant ces conditions d'utilisation, veuillez nous contacter à timothee.demares@alextraveylan.fr.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center ">Dernière mise à jour : 05/08/2024</div>
      </div>
    </div>
  )
}
