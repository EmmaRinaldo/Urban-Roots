"use client";

import { Marker } from '../../types/marker';

interface MarkerListItemProps {
  marker: Marker;
}

const getIconForProjectType = (type: string) => {
  switch (type) {
    case "jardin-potager":
      return "/jardin-icon.png";
    case "ferme-urbaine-participative":
      return "/ferme-participative-icon.png";
    case "ferme-urbaine-specialisee":
      return "/ferme-specialisee-icon.png";
    default:
      return "";
  }
};

const mapProjectType = (type: string): string => {
  switch (type) {
    case "jardin-potager":
      return "JARDIN / POTAGER";
    case "ferme-urbaine-participative":
      return "FERME PARTICIPATIVE";
    case "ferme-urbaine-specialisee":
      return "FERME SPECIALISÉE";
    default:
      return type;
  }
};

export default function MarkerListItem({ marker }: MarkerListItemProps) {
  const icon = getIconForProjectType(marker.list_typeprojet[0]); // Assuming the first type determines the icon
  const projectTypes = marker.list_typeprojet.map(mapProjectType).join(', ');

  return (
    <div className="flex items-start space-x-4">
      {icon && <img src={icon} alt="Project Icon" className="w-fit h-[60px] mt-1" />}
      <div>
        <h3 className="text-lg font-semibold">{marker.title}</h3>
        <p>{marker.cp} {marker.ville}</p>
        <p className="text-primary">{projectTypes}</p>
      </div>
    </div>
  );
}
