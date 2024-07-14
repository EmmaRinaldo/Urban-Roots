"use client";

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect, useState } from 'react';

// Fix for default marker icons not showing
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

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

  useEffect(() => {
    fetchData().then(data => setMarkers(data)).catch(error => console.error(error));
  }, []);

  useEffect(() => {
    // This useEffect is used to adjust the map size after rendering
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }, []);

  return (

    <>

      <Navbar />
      
      <div className="bg-white text-gray-800">
        <MapContainer center={[48.819555930925, 2.2994846425247]} zoom={7} style={{ height: '100vh', width: '70%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers.map((marker, index) => (
            <Marker key={index} position={[marker.lat, marker.lng]}>
              <Popup>
                <div>
                  <h2 className="font-bold">{marker.title}</h2>
                  <p><strong>Type de Projet:</strong> {marker.list_typeprojet.join(', ')}</p>
                  <p><strong>Code Postal:</strong> {marker.cp}</p>
                  <p><strong>Ville:</strong> {marker.ville}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <Footer />
    
    </>
    
    
  )
}

export default Carte