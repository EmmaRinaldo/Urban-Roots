export default function MentionPage() {
    return (
      <section className="py-16 px-6 lg:px-8 mx-auto max-w-4xl">
        <h1 className="bg-[#e0f7e0] p-3 rounded-xl my-2 font-semibold text-center text-5xl sm:text-5xl lg:text-6xl">Mentions Légales</h1>
        <div>
          <p className="text-sm text-muted-foreground">Dernière mise à jour : 11/09/2024</p>
          <p className="text-sm text-muted-foreground">Ce site web est un projet scolaire réalisé dans le cadre du programme de Bachelor à DC Paris.</p>

          <h2 className="text-2xl font-semibold mt-8">1. Informations Générales</h2>
          <p className="mt-2 text-base">Conformément aux dispositions de l&apos;article 6 III-1 de la loi n°2004-575 du 21 juin 2004 pour la confiance dans l&apos;économie numérique, nous informons les utilisateurs du site Urban Roots des éléments suivants :</p>

          <h2 className="text-2xl font-semibold mt-8">2. Éditeur du Site</h2>
          <p className="mt-2 text-base">
            <strong>Nom :</strong> Rinaldo Emma <br />
            <strong>Adresse :</strong> 111 Rue de la République <br />
            <strong>Téléphone :</strong> 0000 000 000 <br />
            <strong>Email :</strong> <a href="mailto:emmarinaldo@hotmail.fr" className="text-primary hover:underline">emmarinaldo@hotmail.fr</a> <br />
            <strong>Numéro d&apos;identification :</strong> 0000 0000 0000 0000 <br />
            <strong>Responsable de la publication :</strong> Rinaldo Emma
          </p>

          <h2 className="text-2xl font-semibold mt-8">3. Hébergement du Site</h2>
          <p className="mt-2 text-base">
            <strong>Hébergeur :</strong> Hostinger International Ltd. <br />
            <strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre <br />
            <strong>Site web :</strong> <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://www.hostinger.fr</a> <br />
            <strong>Numéro de téléphone :</strong> +357 24030137
          </p>

          <h2 className="text-2xl font-semibold mt-8">4. Propriété Intellectuelle</h2>
          <p className="mt-2 text-base">Tous les contenus présents sur le site Urban Roots, incluant, mais sans s&apos;y limiter, les textes, images, graphismes, logos, vidéos, et icônes, sont protégés par les lois en vigueur sur la propriété intellectuelle. Toute reproduction, distribution, modification, adaptation, retransmission ou publication, même partielle, de ces différents éléments est strictement interdite sans notre accord exprès et préalable.</p>

          <h2 className="text-2xl font-semibold mt-8">5. Limitation de Responsabilité</h2>
          <p className="mt-2 text-base">Nous nous efforçons d&apos;assurer au mieux l&apos;exactitude et la mise à jour des informations diffusées sur ce site. Toutefois, nous ne pouvons garantir l&apos;exactitude, la précision ou l&apos;exhaustivité des informations mises à disposition sur ce site. En conséquence, nous déclinons toute responsabilité pour toute imprécision, inexactitude ou omission portant sur des informations disponibles sur le site.</p>

          <h2 className="text-2xl font-semibold mt-8">6. Liens Hypertextes</h2>
          <p className="mt-2 text-base">Le site peut contenir des liens hypertextes vers d&apos;autres sites. Nous ne sommes pas responsables du contenu ou des pratiques de confidentialité de ces autres sites et encourageons nos utilisateurs à lire les politiques de confidentialité de chaque site qu&apos;ils visitent.</p>

          <h2 className="text-2xl font-semibold mt-8">7. Droit Applicable</h2>
          <p className="mt-2 text-base">Les présentes mentions légales sont régies par le droit français. En cas de litige, et à défaut de résolution amiable, les tribunaux français seront seuls compétents.</p>

          <h2 className="text-2xl font-semibold mt-8">8. Contact</h2>
          <p className="mt-2 text-base">Pour toute question ou demande d&apos;information concernant le site, veuillez contacter l&apos;éditeur à l&apos;adresse suivante : <a href="mailto:emmarinaldo@hotmail.fr" className="text-primary hover:underline">emmarinaldo@hotmail.fr</a>.</p>
        </div>
      </section>
    );
}