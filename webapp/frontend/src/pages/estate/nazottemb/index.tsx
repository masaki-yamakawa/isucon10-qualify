import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFzYWtpLXlhbWFrYXdhIiwiYSI6ImNrcWE3NGRsdDA3ZmQydnFzazNodmQzcDkifQ.abGf5qHeNi1yU0hdU_xElQ'


const NazotteMapBoxPage: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [lng, setLng] = useState(142.0);
  const [lat, setLat] = useState(40.0);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    map.addControl(new mapboxgl.NavigationControl(), 'top-right');

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    return () => map.remove();
  }, []);

  return (
    <div>
      <div className='sidebarStyle'>
        <div>
          Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
        </div>
      </div>
      <div className='map-container' ref={mapContainer} />
    </div>
  );
};

export default NazotteMapBoxPage;