"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';

// Importer dynamiquement les composants react-leaflet avec SSR désactivé
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const MarkerCluster = dynamic(() => import('@/components/MarkerCluster'), { ssr: false });

// Fix for default marker icons not showing
if (typeof window !== 'undefined') {
  const L = require('leaflet');
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
}

const fetchData = async () => {
  const response = await fetch('/api/markers');
  if (!response.ok) {
    throw new Error('Failed to fetch markers');
  }
  const data = await response.json();
  return data;
};

const Carte = () => {
  const [markers, setMarkers] = useState([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    fetchData().then(data => setMarkers(data)).catch(error => console.error('Error fetching markers:', error));
  }, []);

  useEffect(() => {
    // This useEffect is used to adjust the map size after rendering
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    }
  }, []);

  useEffect(() => {
    // Set the isClient state to true when the component is mounted on the client
    setIsClient(true);
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="bg-white text-gray-800">
        {isClient && (
          <MapContainer center={[46.603354, 1.888334]} zoom={6} className="h-[100vh] sm:w-[70%]">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerCluster markers={markers} />
          </MapContainer>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Carte;
