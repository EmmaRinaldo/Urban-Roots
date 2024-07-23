"use client";

import dynamic from 'next/dynamic';
import { useEffect, useState, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import { Marker } from '../../types/marker';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Filter, List } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import MarkerListItem from '../components/MarkerListItem';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

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
  const [filters, setFilters] = useState<string[]>([]);
  const [visibleMarkers, setVisibleMarkers] = useState<Marker[]>([]);

  const mapRef = useRef<L.Map | null>(null);

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

  const handleFilterChange = (filter: string) => {
    setFilters(prevFilters =>
      prevFilters.includes(filter)
        ? prevFilters.filter(f => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredMarkers = markers.filter(marker =>
    filters.length === 0 || filters.some(filter => marker.list_typeprojet.includes(filter))
  );

  const handleMarkersChange = (visibleMarkers: Marker[]) => {
    setVisibleMarkers(visibleMarkers);
  };

  return (
    <div className='mx-auto flex flex-col md:flex-row z-0'>
      <div className="lg:w-[65%] w-full flex flex-col gap-y-5 mx-auto lg:h-[80vh] h-[53vh]">
        {isClient && (
          <MapContainer
            center={[46.603354, 1.888334]}
            zoom={6}
            className="h-full w-full z-0"
            whenReady={() => {
              const mapInstance = mapRef.current;
              if (mapInstance) {
                const updateVisibleMarkersCount = () => {
                  const bounds = mapInstance.getBounds();
                  const visibleMarkers = filteredMarkers.filter(marker =>
                    bounds.contains([parseFloat(marker.lat), parseFloat(marker.lng)])
                  );
                  handleMarkersChange(visibleMarkers);
                };

                mapInstance.on('moveend', updateVisibleMarkersCount);
                updateVisibleMarkersCount();
              }
            }}
            ref={mapRef}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerCluster markers={filteredMarkers} onMarkersChange={handleMarkersChange} />
          </MapContainer>
        )}
      </div>

      <div className='lg:w-[35%] w-full mx-auto'>
        <Tabs defaultValue='filtres' className='w-full'>
          <TabsList className="grid w-full grid-cols-2 h-full px-2">
            <TabsTrigger value='filtres' className='md:text-lg text-base'>
              <Filter className='h-5 w-5 mr-2' /> Filtres
            </TabsTrigger>
            <TabsTrigger value='liste' className='md:text-lg text-base'>
              <List className='h-5 w-5 mr-2' />Liste<span className='md:text-base text-sm ml-2 text-muted-foreground'>({visibleMarkers.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value='filtres'>
            <div className="p-4">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Type de projet</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <label htmlFor="jardin-potager" className="cursor-pointer">
                    <img src="/jardin-icon.png" alt="Jardin" className="w-fit h-[50px] inline-block mr-1" />
                    Jardin / potager
                  </label>
                  <Checkbox
                    id="jardin-potager"
                    checked={filters.includes('jardin-potager')}
                    onCheckedChange={() => handleFilterChange('jardin-potager')}
                    className="ml-3"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="ferme-urbaine-participative" className="cursor-pointer">
                    <img src="/ferme-participative-icon.png" alt="Ferme Participative" className="w-fit h-11 inline-block mr-1" />
                    Ferme urbaine participative
                  </label>
                  <Checkbox
                    id="ferme-urbaine-participative"
                    checked={filters.includes('ferme-urbaine-participative')}
                    onCheckedChange={() => handleFilterChange('ferme-urbaine-participative')}
                    className="ml-3"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="ferme-urbaine-specialisee" className="cursor-pointer">
                    <img src="/ferme-specialisee-icon.png" alt="Ferme Spécialisée" className="w-fit h-11 inline-block mr-1" />
                    Ferme urbaine spécialisée
                  </label>
                  <Checkbox
                    id="ferme-urbaine-specialisee"
                    checked={filters.includes('ferme-urbaine-specialisee')}
                    onCheckedChange={() => handleFilterChange('ferme-urbaine-specialisee')}
                    className="ml-3"
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value='liste'>
            <ScrollArea className="h-[80vh]">
              <div className='p-4'>
                {visibleMarkers.map((marker, index) => (
                  <div key={marker.slug}>
                    <MarkerListItem marker={marker} />
                    {index < visibleMarkers.length - 1 && <Separator className="my-2" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default CartePage;
