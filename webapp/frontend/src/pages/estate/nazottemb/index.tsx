import React, { useEffect, useState, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = 'pk.eyJ1IjoibWFzYWtpLXlhbWFrYXdhIiwiYSI6ImNrcWE3NGRsdDA3ZmQydnFzazNodmQzcDkifQ.abGf5qHeNi1yU0hdU_xElQ'


const NazotteMapBoxPage: React.FC = () => {
  const [mapInstance, setMapInstance] = useState<mapboxgl.Map>();
  const mapContainer = useRef<HTMLDivElement | null>(null);

  const [lng, setLng] = useState(139.77044378);
  const [lat, setLat] = useState(35.67832667);
  const [zoom, setZoom] = useState(9);

  const [mapStyle, setMapStyle] = useState('satellite');

  const changeStyle = (e: any) => {
    console.log("changeStyle:style=" + e.target.id);
    setMapStyle(e.target.value);
    mapInstance.setStyle('mapbox://styles/mapbox/' + e.target.id);
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-v9',
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
          <input id="satellite-v9" type="radio" name="rtoggle" value="satellite" onChange={changeStyle} checked={mapStyle === 'satellite'} />satellite
        </label>
        <label>
          <input id="light-v10" type="radio" name="rtoggle" value="light" onChange={changeStyle} checked={mapStyle === 'light'} />light
        </label>
        <label>
          <input id="dark-v10" type="radio" name="rtoggle" value="dark" onChange={changeStyle} checked={mapStyle === 'dark'} />dark
        </label>
        <label>
          <input id="streets-v11" type="radio" name="rtoggle" value="streets" onChange={changeStyle} checked={mapStyle === 'streets'} />streets
        </label>
        <label>
          <input id="outdoors-v11" type="radio" name="rtoggle" value="outdoors" onChange={changeStyle} checked={mapStyle === 'outdoors'} />outdoors
        </label>
      </div>
      <div className='map-container' ref={mapContainer} />
    </div>
  );
};

export default NazotteMapBoxPage;