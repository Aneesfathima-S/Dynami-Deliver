import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const locations = {
  "T.Nagar": [13.0418, 80.2337],
  "Velachery": [12.9784, 80.2182],
  "Tambaram": [12.9229, 80.1275],
  "Guindy": [13.0109, 80.2201],
  "Adyar": [13.0067, 80.2557],
  "OMR": [12.9057, 80.0936],
  "Egmore": [13.0793, 80.2610],
};

const ChangeView = ({ center }) => {
  const map = useMap();
  map.setView(center, 15);
  return null;
};

const RouteOptimization = () => {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [route, setRoute] = useState([]);
  const [eta, setETA] = useState(null);

  const emojiIcon = (emoji) =>
    L.divIcon({
      className: "emoji-marker",
      html: `<div style="font-size: 25px; text-align: center;">${emoji}</div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });

  const graph = {
    "T.Nagar": { "Velachery": 7, "Guindy": 4, "Egmore": 6 },
    "Velachery": { "Tambaram": 10, "T.Nagar": 7 },
    "Tambaram": { "Guindy": 12, "Velachery": 10, "Egmore": 22 },
    "Guindy": { "T.Nagar": 4, "Adyar": 5, "Tambaram": 12 },
    "Adyar": { "Guindy": 5, "OMR": 8 }
  };

  const dijkstra = (start, end) => {
    let distances = {};
    let prev = {};
    let queue = new Set(Object.keys(graph));

    Object.keys(graph).forEach((node) => {
      distances[node] = Infinity;
      prev[node] = null;
    });

    distances[start] = 0;

    while (queue.size > 0) {
      let current = [...queue].reduce((minNode, node) =>
        distances[node] < distances[minNode] ? node : minNode
      );

      if (current === end) break;
      queue.delete(current);

      for (let neighbor in graph[current]) {
        let newDist = distances[current] + graph[current][neighbor];
        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          prev[neighbor] = current;
        }
      }
    }

    let path = [];
    let step = end;
    while (step) {
      path.unshift(step);
      step = prev[step];
    }

    let totalDistance = distances[end];
    let estimatedTime = ((totalDistance / 40) * 60).toFixed(0);

    return { path, totalDistance, estimatedTime };
  };

  const handleCalculate = () => {
    if (!start || !end || start === end) return;

    const result = dijkstra(start, end);
    setRoute(result.path.map((loc) => locations[loc]));
    setETA(result.estimatedTime);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">🛣️Route Optimization</h2>

      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <label className="block text-lg font-semibold mb-2">Start Location:</label>
        <select className="w-full p-2 border rounded mb-4" value={start} onChange={(e) => setStart(e.target.value)}>
          <option value="">Select</option>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
<br></br>
        <label className="block text-lg font-semibold mb-2">End Location:</label>
        <select className="w-full p-2 border rounded mb-4" value={end} onChange={(e) => setEnd(e.target.value)}>
          <option value="">Select</option>
          {Object.keys(locations).map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>

        <button onClick={handleCalculate} className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Calculate Route
        </button>
      </div>

      {eta && (
        <div className="mt-4 text-lg font-semibold text-gray-700">
          Estimated Travel Time: <span className="text-blue-500">{eta} mins</span>
        </div>
      )}

      <MapContainer center={[13.0418, 80.2337]} zoom={12} style={{ height: "400px", width: "100%", marginTop: "20px", borderRadius: "10px" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {start && <Marker position={locations[start]} icon={emojiIcon("🟢")} />}
        {end && <Marker position={locations[end]} icon={emojiIcon("📍")} />}
        {route.length > 1 && <Polyline positions={route} color="blue" />}
      </MapContainer>
    </div>
  );
};

export default RouteOptimization;
