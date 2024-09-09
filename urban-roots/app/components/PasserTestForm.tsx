'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button"; // Utiliser le bouton de shadcn/ui
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"; // Utiliser le sélecteur de shadcn/ui

interface UserResponses {
  climate: string;
  soilType: string;
  sunExposure: string;
  maintenance: number;
  interests: string[];
}

interface PasserTestFormProps {
  userId: string;
}

export default function PasserTestForm({ userId }: PasserTestFormProps) {
  const [responses, setResponses] = useState<UserResponses>({
    climate: '',
    soilType: '',
    sunExposure: '',
    maintenance: 1,
    interests: [],
  });

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/test/plant-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ responses, userId }),
      });

      if (response.ok) {
        router.push('/test');
      } else {
        console.error('Erreur lors de la soumission des réponses');
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      const target = event.target as HTMLInputElement;
      const checked = target.checked;

      setResponses(prevState => ({
        ...prevState,
        interests: checked
          ? [...prevState.interests, value]
          : prevState.interests.filter(interest => interest !== value),
      }));
    } else {
      setResponses({ ...responses, [name]: value });
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Passer le Test de Jardinage</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Climat :</label>
          <Select name="climate" onValueChange={(value) => setResponses({ ...responses, climate: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un climat" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="temperate">Tempéré</SelectItem>
              <SelectItem value="tropical">Tropical</SelectItem>
              {/* Ajouter d'autres options */}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type de Sol :</label>
          <Select name="soilType" onValueChange={(value) => setResponses({ ...responses, soilType: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type de sol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sandy">Sablonneux</SelectItem>
              <SelectItem value="loamy">Limoneux</SelectItem>
              {/* Ajouter d'autres options */}
            </SelectContent>
          </Select>
        </div>

        {/* Ajouter d'autres champs pour sunExposure, maintenance et interests */}

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'En cours...' : 'Soumettre'}
        </Button>
      </form>
    </div>
  );
}
