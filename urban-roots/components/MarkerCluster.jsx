// components/MarkerCluster.jsx
"use client";

import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import { useMap } from "react-leaflet";

const MarkerCluster = ({ markers }) => {
  const map = useMap();
  const [markerCluster, setMarkerCluster] = useState(null);

  useEffect(() => {
    if (!map || !markers || markers.length === 0) return;

    const leafletMarkers = markers.map((marker) =>
      L.marker([marker.lat, marker.lng]).bindPopup(
        `<div>
          <h2 class="font-bold">${marker.title}</h2>
          <p><strong>Type de Projet:</strong> ${marker.list_typeprojet.join(', ')}</p>
          <p><strong>Code Postal:</strong> ${marker.cp}</p>
          <p><strong>Ville:</strong> ${marker.ville}</p>
        </div>`
      )
    );

    const markerClusterGroup = L.markerClusterGroup();
    markerClusterGroup.addLayers(leafletMarkers);

    map.addLayer(markerClusterGroup);
    setMarkerCluster(markerClusterGroup);

    return () => {
      map.removeLayer(markerClusterGroup);
    };
  }, [map, markers]);

  return null;
};

export default MarkerCluster;
