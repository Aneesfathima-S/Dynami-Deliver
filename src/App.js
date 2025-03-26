import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import MyDeliverPage from './MyDeliverPage';
import DeliveryApp from './DeliveryApp';
import LiveTracking from './LiveTracking';
import RouteOptimization from './RouteOptimization';
import MapComponent from './MapComponent';

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/app" element={<DeliveryApp />} />
        <Route path="/my-deliveries" element={<MyDeliverPage />} />
        <Route path="/location" element={<LiveTracking />} />
        <Route path="/RouteOptimization" element={<RouteOptimization />} />
      </Routes>
    </div>
  );
};

export default App;
