import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import "leaflet/dist/leaflet.css"; // ✅ Correct way to import Leaflet CSS

// Get the root element
const rootElement = document.getElementById("root");

// Create a root for React 18
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
