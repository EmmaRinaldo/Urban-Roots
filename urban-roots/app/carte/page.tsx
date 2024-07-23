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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  const [activityFilter, setActivityFilter] = useState<string>('none');
  const [techniqueFilter, setTechniqueFilter] = useState<string>('none');
  const [productionFilter, setProductionFilter] = useState<string>('none');
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

  const filteredMarkers = markers.filter(marker => {
    const matchesType = filters.length === 0 || filters.some(filter => marker.list_typeprojet.includes(filter));
    const matchesActivity = activityFilter === 'none' || marker.list_typeactivite.includes(activityFilter);
    const matchesTechnique = techniqueFilter === 'none' || marker.list_techniqueprod.includes(techniqueFilter);
    const matchesProduction = productionFilter === 'none' || marker.list_typeprod.includes(productionFilter);
    return matchesType && matchesActivity && matchesTechnique && matchesProduction;
  });

  const handleMarkersChange = (visibleMarkers: Marker[]) => {
    setVisibleMarkers(visibleMarkers);
  };

  return (
    <div className='mx-auto flex flex-col md:flex-row z-0'>
      <div className="lg:w-[75%] w-full flex flex-col gap-y-5 mx-auto lg:h-[80vh] h-[53vh]">
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

      <div className='lg:w-[25%] w-full mx-auto'>
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
            <div className="p-10">
              <h2 className="text-2xl font-semibold mb-4 text-primary">Type de projet</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/jardin-icon.png" alt="Jardin" className="w-fit h-[50px]" />
                    <label htmlFor="jardin-potager" className="cursor-pointer font-medium text-base">
                      Jardin / potager
                    </label>
                  </div>
                  <Checkbox
                    id="jardin-potager"
                    checked={filters.includes('jardin-potager')}
                    onCheckedChange={() => handleFilterChange('jardin-potager')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/ferme-participative-icon.png" alt="Ferme Participative" className="w-fit h-[50px]" />
                    <label htmlFor="ferme-urbaine-participative" className="cursor-pointer font-medium text-base">
                      Ferme urbaine participative
                    </label>
                  </div>
                  <Checkbox
                    id="ferme-urbaine-participative"
                    checked={filters.includes('ferme-urbaine-participative')}
                    onCheckedChange={() => handleFilterChange('ferme-urbaine-participative')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <img src="/ferme-specialisee-icon.png" alt="Ferme Spécialisée" className="w-fit h-[50px]" />
                    <label htmlFor="ferme-urbaine-specialisee" className="cursor-pointer font-medium text-base">
                      Ferme urbaine spécialisée
                    </label>
                  </div>
                  <Checkbox
                    id="ferme-urbaine-specialisee"
                    checked={filters.includes('ferme-urbaine-specialisee')}
                    onCheckedChange={() => handleFilterChange('ferme-urbaine-specialisee')}
                  />
                </div>
              </div>

              <Separator className="my-4" />

              <div className="space-y-4">
                <div>
                  <label htmlFor="activity-filter" className="block text-base font-medium text-gray-700">
                    Type d&apos;activité
                  </label>
                  <Select value={activityFilter} onValueChange={setActivityFilter}>
                    <SelectTrigger id="activity-filter" className="w-full">
                      <SelectValue placeholder="Sélectionnez une activité" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="animation">Animation</SelectItem>
                      <SelectItem value="compostage">Compostage</SelectItem>
                      <SelectItem value="ecopaturage">Écopâturage</SelectItem>
                      <SelectItem value="production">Production</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="technique-filter" className="block text-base font-medium text-gray-700">
                    Technique de production
                  </label>
                  <Select value={techniqueFilter} onValueChange={setTechniqueFilter}>
                    <SelectTrigger id="technique-filter" className="w-full">
                      <SelectValue placeholder="Sélectionnez une technique" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="permaculture">Permaculture</SelectItem>
                      <SelectItem value="pleine-terre">Pleine terre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="production-filter" className="block text-base font-medium text-gray-700">
                    Type de production
                  </label>
                  <Select value={productionFilter} onValueChange={setProductionFilter}>
                    <SelectTrigger id="production-filter" className="w-full">
                      <SelectValue placeholder="Sélectionnez un type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Aucune</SelectItem>
                      <SelectItem value="compost">Compost</SelectItem>
                      <SelectItem value="fleurs">Fleurs</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="herbes-aromatiques">Herbes aromatiques</SelectItem>
                      <SelectItem value="legumes">Légumes</SelectItem>
                      <SelectItem value="maraichage-arboriculture">Maraîchage & Arboriculture</SelectItem>
                    </SelectContent>
                  </Select>
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
