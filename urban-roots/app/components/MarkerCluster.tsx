"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";
import { Marker } from '../../types/marker';

interface MarkerClusterProps {
  markers: Marker[];
}

// Custom Icon pour chaque type de projet
const jardinIcon = L.icon({
  iconUrl: '/jardin-icon.png',
  iconSize: [100, 70],
  iconAnchor: [19, 50], 
  popupAnchor: [30, -50],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [70, 70],
  shadowAnchor: [-6, 45]
});

const fermeParticipativeIcon = L.icon({
  iconUrl: '/ferme-participative-icon.png',
  iconSize: [100, 70],
  iconAnchor: [19, 50], 
  popupAnchor: [30, -50],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [70, 70],
  shadowAnchor: [-6, 45]
});

const fermeSpecialiseeIcon = L.icon({
  iconUrl: '/ferme-specialisee-icon.png',
  iconSize: [100, 70],
  iconAnchor: [19, 50], 
  popupAnchor: [30, -50],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [70, 70],
  shadowAnchor: [-6, 45]
});

const getIconForProjectType = (type: string) => {
  switch (type) {
    case "jardin-potager":
      return jardinIcon;
    case "ferme-urbaine-participative":
      return fermeParticipativeIcon;
    case "ferme-urbaine-specialisee":
      return fermeSpecialiseeIcon;
    default:
      return L.icon({
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', //Icon par défaut
        iconSize: [100, 70], 
        iconAnchor: [19, 50],
        popupAnchor: [30, -50],
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
        shadowSize: [70, 70],
        shadowAnchor: [-6, 45]
      });
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

export function MarkerCluster({ markers }: MarkerClusterProps) {
  const map = useMap();
  const [markerCluster, setMarkerCluster] = useState<L.MarkerClusterGroup | null>(null);

  useEffect(() => {
    if (!map || !markers || markers.length === 0) return;

    const leafletMarkers = markers.map((marker) => {
      const projectTypes = marker.list_typeprojet.map(mapProjectType).join(', ');
      const icon = getIconForProjectType(marker.list_typeprojet[0]); // Assuming the first type determines the icon
      return L.marker([parseFloat(marker.lat), parseFloat(marker.lng)], { icon }).bindPopup(
        `<div>
          <h2 class="font-medium mt-1 text-lg">${marker.title}</h2>
          <p className="from-accent-foreground">${marker.cp} ${marker.ville}</p>
          <p class="font-medium">${projectTypes}</p>
        </div>`
      );
    });

    const markerClusterGroup = L.markerClusterGroup();
    markerClusterGroup.addLayers(leafletMarkers);

    map.addLayer(markerClusterGroup);
    setMarkerCluster(markerClusterGroup);

    return () => {
      if (markerClusterGroup) {
        map.removeLayer(markerClusterGroup);
      }
    };
  }, [map, markers]);

  return null;
}
