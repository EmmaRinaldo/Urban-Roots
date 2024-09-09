import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Plant } from '@prisma/client'; // Importer Plant depuis Prisma

const prisma = new PrismaClient();

// Interface pour les réponses utilisateur
interface UserResponses {
  climate: string;
  soilType: string;
  sunExposure: string;
  maintenance: number;
  interests: string[];
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, responses }: { userId: string; responses: UserResponses } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      // Récupérez toutes les plantes de la base de données
      const plants: Plant[] = await prisma.plant.findMany();

      // Appliquez l'algorithme de correspondance
      const matchedPlants = matchPlants(responses, plants);

      // Enregistrez les recommandations dans la table User
      await prisma.user.update({
        where: { id: userId },
        data: { gardeningSuggestions: JSON.stringify(matchedPlants) },
      });

      res.status(200).json(matchedPlants);
    } catch (error) {
      console.error('Erreur lors de la sauvegarde des recommandations:', error);
      res.status(500).json({ error: 'Erreur lors de la sauvegarde des recommandations' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function matchPlants(userResponses: UserResponses, plants: Plant[]) {
  return plants
    .map((plant) => {
      let score = 0;

      // Correspondance des critères
      if (plant.climate.includes(userResponses.climate)) score++;
      if (plant.soilType.includes(userResponses.soilType)) score++;
      if (plant.sunExposure === userResponses.sunExposure) score++;
      if (plant.maintenance <= userResponses.maintenance) score++;
      if (userResponses.interests.some((interest) => plant.interests.includes(interest))) score++;

      return { plant, score };
    })
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score >= 3); // Filtrer les plantes avec un score de 3 ou plus
}
