import React from "react";

interface Resource {
  type: string;
  title: string;
  link: string;
}

interface Suggestion {
  title: string;
  description: string;
  tips: string[];
  resources: Resource[];
}

interface GardeningSuggestionsProps {
  suggestions: Suggestion[];
}

const GardeningSuggestions: React.FC<GardeningSuggestionsProps> = ({ suggestions }) => {
  return (
    <div className="flex flex-col items-center rounded-md border border-dashed p-8 text-center">
      <h2 className="mt-6 text-xl font-semibold">Suggestions de jardinage</h2>
      <div className="mt-4 space-y-4">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="text-left">
            <h3 className="text-lg font-bold">{suggestion.title}</h3>
            <p>{suggestion.description}</p>
            {suggestion.tips && suggestion.tips.length > 0 && (
              <ul className="list-disc list-inside mt-2">
                {suggestion.tips.map((tip, tipIndex) => (
                  <li key={tipIndex}>{tip}</li>
                ))}
              </ul>
            )}
            {suggestion.resources && suggestion.resources.length > 0 && (
              <div className="mt-2">
                <h4 className="font-semibold">Ressources:</h4>
                <ul className="list-disc list-inside">
                  {suggestion.resources.map((resource, resIndex) => (
                    <li key={resIndex}>
                      <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {resource.type === 'video' ? '🎥 ' : '📄 '}
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {index < suggestions.length - 1 && <hr className="my-4" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GardeningSuggestions;
