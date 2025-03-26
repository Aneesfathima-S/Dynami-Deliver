import React, { useEffect, useState, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const LiveTracking = () => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [deliveryDetails, setDeliveryDetails] = useState({
    id: 'DEL001',
    status: 'In Transit',
    estimatedArrival: 'N/A'
  });

  // Simulated route coordinates
  const routeCoordinates = [
    [28.6139, 77.2090], // Delhi
    [28.6192, 77.2190],
    [28.6246, 77.2295],
    [28.6307, 77.2410],
    [28.6381, 77.2530],
    [28.6448, 77.2641],
    [28.6517, 77.2751],
    [28.6579, 77.2860],
    [28.7041, 77.1025], // Delhi Airport
  ];

  useEffect(() => {
    // Initialize Leaflet map
    mapRef.current = L.map('map').setView(routeCoordinates[0], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapRef.current);

    // Define a custom red pin icon
    const redPinIcon = L.divIcon({
      className: 'custom-pin',
      html: '<svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 0C5.37 0 0 5.37 0 12c0 7.14 12 24 12 24s12-16.86 12-24c0-6.63-5.37-12-12-12zm0 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#FF0000"/></svg>',
      iconSize: [24, 36],
      iconAnchor: [12, 36],
      popupAnchor: [0, -36]
    });

    // Create marker and add to map
    markerRef.current = L.marker(routeCoordinates[0], { icon: redPinIcon }).addTo(mapRef.current);

    // Draw the route line
    L.polyline(routeCoordinates, { color: 'blue' }).addTo(mapRef.current);

    let currentIndex = 0;
    const updateInterval = setInterval(() => {
      if (currentIndex < routeCoordinates.length) {
        const newLatLng = routeCoordinates[currentIndex];
        markerRef.current.setLatLng(newLatLng);
        mapRef.current.panTo(newLatLng);

        // Update delivery details
        setDeliveryDetails(prevDetails => ({
          ...prevDetails,
          status: 'In Transit',
          estimatedArrival: `Approx. ${(routeCoordinates.length - currentIndex) * 5} minutes`
        }));

        currentIndex++;
      } else {
        clearInterval(updateInterval);
        setDeliveryDetails(prevDetails => ({
          ...prevDetails,
          status: 'Delivered',
          estimatedArrival: 'Arrived'
        }));
      }
    }, 2000); // Update every 2 seconds

    return () => {
      clearInterval(updateInterval);
      mapRef.current.remove();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="live-tracking-container">
      <div className="map-container">
        <div id="map" style={{ height: '500px', width: '100%' }}></div>
      </div>
      <div className="delivery-details">
        <h2>Delivery Details</h2>
        <p><strong>Delivery ID:</strong> {deliveryDetails.id}</p>
        <p><strong>Status:</strong> {deliveryDetails.status}</p>
        <p><strong>Estimated Arrival:</strong> {deliveryDetails.estimatedArrival}</p>
      </div>
      <div className="live-status">
        <h2>Live Status</h2>
        <p>The delivery is currently {deliveryDetails.status.toLowerCase()} and is expected to arrive in {deliveryDetails.estimatedArrival}.</p>
      </div>
      <style jsx>{`
        .live-tracking-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px;
        }
        .map-container {
          width: 100%;
          max-width: 800px;
          margin-bottom: 20px;
        }
        #map {
          height: 500px;
          width: 100%;
        }
        .delivery-details, .live-status {
          width: 100%;
          max-width: 800px;
          background-color: #f9f9f9;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .delivery-details h2, .live-status h2 {
          margin-bottom: 10px;
          font-size: 1.5em;
        }
        .delivery-details p, .live-status p {
          margin: 5px 0;
        }
      `}</style>
    </div>
  );
};

export default LiveTracking;