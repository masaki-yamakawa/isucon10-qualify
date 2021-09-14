import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.xxx'

const mapStyle: mapboxgl.Style = {
  version: 8,
  sources: {
    OSM: {
      type: 'raster',
      tiles: ['http://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '<a href="http://osm.org/copyright">© OpenStreetMap contributors</a>',
    },
  },
  layers: [
    {
      id: 'OSM',
      type: 'raster',
      source: 'OSM',
      minzoom: 0,
      maxzoom: 18,
    },
  ],
};

const NazotteMapBoxPage: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: mapStyle,
      center: [142.0, 40.0],
      zoom: 4,
    });
    setMapInstance(map);
  }, []);

  return (
    <div style={{ height: 700 }} ref={mapContainer} />
  );
};

export default NazotteMapBoxPage;