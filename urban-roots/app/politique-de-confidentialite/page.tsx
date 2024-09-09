export default function PolitiquePage() {
    return (
      <section className="py-16 px-6 lg:px-8 mx-auto max-w-4xl">
        <h1 className="bg-[#e0f7e0] p-5 rounded-xl my-2 font-semibold text-center text-5xl sm:text-5xl lg:text-6xl">Politique de Confidentialité</h1>
        <div>
          <p className="text-sm text-muted-foreground">Dernière mise à jour : 11/09/2024</p>
          <p className="text-sm text-muted-foreground">Ce site web est un projet scolaire réalisé dans le cadre du programme de Bachelor à DC Paris.</p>

          <h2 className="text-2xl font-semibold mt-8">1. Introduction</h2>
          <p className="mt-2 text-base">Nous attachons une grande importance à la protection de votre vie privée et de vos données personnelles. La présente politique de confidentialité explique comment nous recueillons, utilisons, partageons et protégeons vos informations lorsque vous utilisez notre site Urban Roots.</p>

          <h2 className="text-2xl font-semibold mt-8">2. Données Collectées</h2>
          <h3 className="text-xl font-semibold mt-6">2.1 Données Fournies par l&apos;Utilisateur</h3>
          <p className="mt-2 text-base">Lors de votre inscription ou de l&apos;utilisation de nos services, nous pouvons collecter les informations suivantes :</p>
          <ul className="list-disc list-inside mt-2">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Pseudonyme</li>
            <li>Image de profil</li>
            <li>Informations de connexion (identifiant et mot de passe crypté)</li>
            <li>Informations liées à votre utilisation du forum et du test de jardinage (messages publiés, résultats de test, etc.)</li>
          </ul>

          <h3 className="text-xl font-semibold mt-6">2.2 Données Collectées Automatiquement</h3>
          <p className="mt-2 text-base">Nous pouvons également collecter automatiquement certaines informations lorsque vous accédez à notre site, telles que :</p>
          <ul className="list-disc list-inside mt-2">
            <li>Adresse IP</li>
            <li>Type de navigateur</li>
            <li>Pages visitées et durée de consultation</li>
            <li>Données de localisation approximative</li>
            <li>Informations sur votre appareil</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">3. Utilisation des Données</h2>
          <p className="mt-2 text-base">Les données que nous collectons sont utilisées pour :</p>
          <ul className="list-disc list-inside mt-2">
            <li>Fournir et améliorer nos services, notamment le forum et le test de jardinage</li>
            <li>Personnaliser votre expérience utilisateur</li>
            <li>Assurer la sécurité et la protection de notre site</li>
            <li>Vous informer des mises à jour de nos services et des nouveautés</li>
            <li>Répondre à vos questions et demandes de support</li>
            <li>Respecter nos obligations légales et réglementaires</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">4. Partage des Données</h2>
          <p className="mt-2 text-base">Nous ne partageons vos données personnelles avec des tiers que dans les circonstances suivantes :</p>
          <ul className="list-disc list-inside mt-2">
            <li>Avec votre consentement explicite</li>
            <li>Pour se conformer à une obligation légale ou répondre à une demande judiciaire</li>
            <li>Pour protéger nos droits, notre propriété ou notre sécurité, ainsi que ceux de nos utilisateurs</li>
            <li>Avec des prestataires de services qui nous assistent dans le fonctionnement de notre site (par exemple, hébergement, maintenance, etc.), sous réserve que ces prestataires respectent des normes strictes de confidentialité et de sécurité</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">5. Sécurité des Données</h2>
          <p className="mt-2 text-base">Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, toute altération, divulgation ou destruction de vos informations personnelles. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n&apos;est complètement sécurisée, nous ne pouvons donc pas garantir une sécurité absolue.</p>

          <h2 className="text-2xl font-semibold mt-8">6. Vos Droits</h2>
          <p className="mt-2 text-base">Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants :</p>
          <ul className="list-disc list-inside mt-2">
            <li>Droit d&apos;accès : Vous pouvez demander à accéder aux données personnelles que nous détenons à votre sujet.</li>
            <li>Droit de rectification : Vous pouvez demander la correction de données personnelles inexactes ou incomplètes.</li>
            <li>Droit de suppression : Vous pouvez demander la suppression de vos données personnelles dans certaines circonstances.</li>
            <li>Droit d&apos;opposition : Vous pouvez vous opposer au traitement de vos données personnelles pour des motifs légitimes.</li>
            <li>Droit à la portabilité : Vous pouvez demander à recevoir vos données personnelles dans un format structuré et couramment utilisé.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8">7. Conservation des Données</h2>
          <p className="mt-2 text-base">Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées ou pour se conformer à nos obligations légales.</p>

          <h2 className="text-2xl font-semibold mt-8">8. Modifications de la Politique de Confidentialité</h2>
          <p className="mt-2 text-base">Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications entreront en vigueur dès leur publication sur le site. Nous vous encourageons à consulter régulièrement cette page pour rester informé des éventuels changements.</p>

          <h2 className="text-2xl font-semibold mt-8">9. Contact</h2>
          <p className="mt-2 text-base">Pour toute question ou demande concernant notre politique de confidentialité, vous pouvez nous contacter à <a href="mailto:emmarinaldo@hotmail.fr" className="text-primary hover:underline">emmarinaldo@hotmail.fr</a>.</p>
        </div>
      </section>
    );
}