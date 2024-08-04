export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Politique de Confidentialité</h1>

        <div className="p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p className="">
              Chez TaskEqualizer, nous nous engageons à protéger la vie privée de nos utilisateurs. Cette politique de confidentialité explique
              comment nous collectons, utilisons et protégeons vos informations personnelles.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Informations que nous collectons</h2>
            <p className="">Nous collectons les informations suivantes :</p>
            <ul className="list-disc list-inside  ml-4">
              <li>Informations d'inscription (nom d'utilisateur, adresse e-mail si fournie, mot de passe hashé)</li>
              <li>Données d'utilisation de l'application (tâches enregistrées, statistiques)</li>
              <li>Les informations de l'appareil et du navigateur appaissent dans les logs</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Comment nous utilisons vos informations</h2>
            <p className="">Nous utilisons vos informations pour :</p>
            <ul className="list-disc list-inside  ml-4">
              <li>Fournir nos services</li>
              <li>Personnaliser votre expérience utilisateur</li>
              <li>Communiquer avec vous concernant votre compte ou nos services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Partage des informations</h2>
            <p className="">
              Nous ne vendons ni ne louons vos informations personnelles à des tiers. Nous pouvons partager vos informations dans les situations
              suivantes :
            </p>
            <ul className="list-disc list-inside  ml-4">
              <li>Avec votre consentement</li>
              <li>Pour se conformer à des obligations légales</li>
              <li>Avec nos fournisseurs de services qui nous aident à exploiter notre application (Stripe en cas d'abonnement)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Sécurité des données</h2>
            <p className="">
              Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations contre l'accès non autorisé, l'altération,
              la divulgation ou la destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Vos droits</h2>
            <p className="">
              Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles. Vous pouvez également vous opposer au
              traitement de vos données ou demander la limitation de ce traitement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Modifications de la politique de confidentialité</h2>
            <p className="">
              Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important
              par e-mail ou par une notification dans l'application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Nous contacter</h2>
            <p className="">
              Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à
              timothee.demares@alextraveylan.fr.
            </p>
          </section>
        </div>

        <div className="mt-8 text-center ">Dernière mise à jour : 05/08/2024</div>
      </div>
    </div>
  )
}
