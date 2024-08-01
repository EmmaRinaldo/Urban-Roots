import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import prisma from '@/app/lib/db';

// Interface for gardening techniques
interface GardeningTechnique {
  space: string;
  plants: string;
  goals: string;
  suggestion: string;
}

// Function to read techniques from the JSON file
const getTechniques = (): GardeningTechnique[] => {
  const filePath = path.join(process.cwd(), 'data', 'techniques.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
};

export async function POST(req: NextRequest) {
  // Parse request body
  const { userId, space, plants, goals } = await req.json();

  // Get techniques from the JSON file
  const techniques = getTechniques();

  // Filter techniques based on the provided criteria
  const matchingTechniques = techniques.filter((technique: GardeningTechnique) =>
    technique.space === space && technique.plants === plants && technique.goals === goals
  );

  // Extract suggestions from the matching techniques
  const suggestions = matchingTechniques.map(technique => technique.suggestion);

  // Save suggestions to the user's profile in the database
  await prisma.user.update({
    where: { id: userId },
    data: { gardeningSuggestions: JSON.stringify(suggestions) },
  });

  // Return the suggestions as a JSON response
  return NextResponse.json({ suggestions });
}
