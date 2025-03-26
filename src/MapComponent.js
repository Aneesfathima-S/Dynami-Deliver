import React from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
    // Dummy location data (latitude, longitude)
    const locations = [
        { name: "Chennai", coords: [13.0827, 80.2707] },
        { name: "Villupuram", coords: [11.9398, 79.4876] },
        { name: "Perambalur", coords: [11.2333, 78.8667] },
        { name: "Trichy", coords: [10.7905, 78.7047] }
    ];

    // Extracting only coordinates for route polyline
    const routeCoordinates = locations.map(loc => loc.coords);

    return (
        <MapContainer center={[11.5, 79]} zoom={7} style={{ height: "500px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            {/* Markers for locations */}
            {locations.map((loc, index) => (
                <Marker key={index} position={loc.coords}>
                    <Popup>{loc.name}</Popup>
                </Marker>
            ))}

            {/* Optimized Route as Polyline */}
            <Polyline positions={routeCoordinates} color="blue" />
        </MapContainer>
    );
};

export default MapComponent;
