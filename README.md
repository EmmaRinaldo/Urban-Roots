# Urban Roots

Plateforme communautaire dédiée au jardinage urbain. Les utilisateurs peuvent localiser des espaces verts sur une carte interactive et échanger sur un forum communautaire.

**Site en production** → [urban-roots.e-rinaldo.com](https://urban-roots.e-rinaldo.com)

## Fonctionnalités

- **Carte des jardins** — visualisation des espaces verts partagés par la communauté
- **Forum** — sujets de discussion, posts avec éditeur de texte riche, commentaires et système de votes
- **Upload d'images** — ajout de photos sur les posts
- **Authentification** — connexion sécurisée via Kinde
- **Mode sombre / clair**

## Stack technique

| Catégorie | Technologies |
|---|---|
| Framework | Next.js 14 (App Router) |
| Langage | TypeScript |
| Base de données | MongoDB Atlas |
| ORM | Prisma |
| Authentification | Kinde |
| Upload | Uploadthing |
| Styles | Tailwind CSS + shadcn/ui |
| Déploiement | Railway |

## Installation

```bash
git clone https://github.com/EmmaRinaldo/Urban-Roots.git
cd Urban-Roots/urban-roots
npm install
```

Copie le fichier d'exemple et remplis les variables :

```bash
cp .env.example .env
```

Lance le serveur de développement :

```bash
npm run dev
```

Ouvre [http://localhost:3000](http://localhost:3000) dans ton navigateur.

Synchronise la base de données :

```bash
npx prisma db push
```

## Variables d'environnement

Voir [.env.example](urban-roots/.env.example) pour la liste complète des variables nécessaires.
