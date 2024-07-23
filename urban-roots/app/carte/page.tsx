"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Marker } from '../../types/marker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, List } from 'lucide-react';

const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const MarkerCluster = dynamic(() => import('../components/MarkerCluster').then(mod => mod.MarkerCluster), { ssr: false });

const getData = async (): Promise<Marker[]> => {
  const response = await fetch('/api/markers');
  if (!response.ok) {
    throw new Error('Failed to fetch markers');
  }
  const data = await response.json();
  return data;
};

function CartePage() {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    getData().then(data => setMarkers(data)).catch(error => console.error('Error fetching markers:', error));
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const L = require('leaflet');
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
      });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
      }, 500);
    }
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='mx-auto flex flex-col md:flex-row z-0'>
      <div className="lg:w-[65%] w-full flex flex-col gap-y-5 mx-auto lg:h-[100vh] h-[50vh]">
        {isClient && (
          <MapContainer center={[46.603354, 1.888334]} zoom={6} className="h-full w-full z-0">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerCluster markers={markers} />
          </MapContainer>
        )}
      </div>

      <div className='lg:w-[35%] w-full mx-auto mb-5'>
        
        <Tabs defaultValue='filtres' className='w-full'>
          <TabsList className="grid w-full grid-cols-2 h-full px-2">
            <TabsTrigger value='filtres' className='md:text-lg text-base'>
              <Filter className='h-5 w-5 mr-2' /> Filtres
            </TabsTrigger>
            <TabsTrigger value='liste' className='md:text-lg text-base'>
              <List className='h-5 w-5 mr-2' />Liste<span className='md:text-base text-sm ml-2 text-muted-foreground'>(4173)</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='filtres'>
            <p>Filtres</p>
          </TabsContent>

          <TabsContent value='liste'>
            <p>Liste</p>
          </TabsContent>
        </Tabs>
        
      </div>
    </div>
  );
}

export default CartePage;
