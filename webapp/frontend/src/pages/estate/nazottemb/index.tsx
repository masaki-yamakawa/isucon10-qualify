import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFzYWtpLXlhbWFrYXdhIiwiYSI6ImNrcWE3NGRsdDA3ZmQydnFzazNodmQzcDkifQ.abGf5qHeNi1yU0hdU_xElQ'


const NazotteMapBoxPage: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [lng, setLng] = useState(139.77044378);
  const [lat, setLat] = useState(35.67832667);
  const [zoom, setZoom] = useState(9);

  const [mapStyle, setMapStyle] = useState('satellite-streets-v11');

  const changeStyle = (e: any) => {
    console.log("changeStyle:style=" + e.target.value);
    setMapStyle(e.target.value);
    mapInstance.setStyle('mapbox://styles/mapbox/' + e.target.value);
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/' + mapStyle,
      center: [lng, lat],
      zoom: zoom
    });
    setMapInstance(map);

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
      <div className="mapstyleStyle">
        <label>
          <input type="radio" name="rtoggle" value="satellite-v9" onChange={changeStyle} checked={mapStyle === 'satellite-v9'} />satellite
        </label>
        <label>
          <input type="radio" name="rtoggle" value="light-v10" onChange={changeStyle} checked={mapStyle === 'light-v10'} />light
        </label>
        <label>
          <input type="radio" name="rtoggle" value="dark-v10" onChange={changeStyle} checked={mapStyle === 'dark-v10'} />dark
        </label>
        <label>
          <input type="radio" name="rtoggle" value="streets-v11" onChange={changeStyle} checked={mapStyle === 'streets-v11'} />streets
        </label>
        <label>
          <input type="radio" name="rtoggle" value="outdoors-v11" onChange={changeStyle} checked={mapStyle === 'outdoors-v11'} />outdoors
        </label>
        <label>
          <input type="radio" name="rtoggle" value="satellite-streets-v11" onChange={changeStyle} checked={mapStyle === 'satellite-streets-v11'} />imagery
        </label>
      </div>
      <div className='map-container' ref={mapContainer} />
    </div>
  );
};

export default NazotteMapBoxPage;