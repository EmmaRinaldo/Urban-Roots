"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';

interface TestFormProps {
  userId: string;
}

const TestForm = ({ userId }: TestFormProps) => {
  const [space, setSpace] = useState('');
  const [plants, setPlants] = useState('');
  const [goals, setGoals] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/test', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, space, plants, goals }),
    });

    if (response.ok) {
      router.push("/test");
    } else {
      console.error('Error:', response.statusText);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-4">Passer le test de jardinage</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Espace disponible</label>
          <Select value={space} onValueChange={setSpace}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un espace" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petit">Petit</SelectItem>
              <SelectItem value="moyen">Moyen</SelectItem>
              <SelectItem value="grand">Grand</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Type de plantes</label>
          <Select value={plants} onValueChange={setPlants}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un type de plantes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="légumes">Légumes</SelectItem>
              <SelectItem value="fleurs">Fleurs</SelectItem>
              <SelectItem value="fruits">Fruits</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Objectifs de jardinage</label>
          <Select value={goals} onValueChange={setGoals}>
            <SelectTrigger>
              <SelectValue placeholder="Sélectionner un objectif" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="augmenter la production">Augmenter la production</SelectItem>
              <SelectItem value="améliorer l'esthétique">Améliorer l'esthétique</SelectItem>
              <SelectItem value="réduire les coûts">Réduire les coûts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Soumettre</Button>
      </form>
    </div>
  );
};

export default TestForm;
