import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>Welcome to DynamiDelivers</h1>
        <p>Customize your delivery time and manage your deliveries efficiently.</p>
      </header>
      <section className="home-actions">
        <Link to="/app">
          <button>Get Started</button>
        </Link>
      </section>

      <button onClick={() => navigate('/location')}>Live Tracking</button><p></p>
      <button onClick={() => navigate('/RouteOptimization')}>Optimized Routes</button>

      <style>
        {`
          .home-page {
            text-align: center;
            padding: 20px;
          }
          .home-header {
            margin-bottom: 20px;
          }
          .home-actions {
            margin-bottom: 20px;
          }
          button {
            padding: 10px 20px;
            font-size: 16px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
          }
          button:hover {
            background-color: #ddd;
          }
        `}
      </style>
    </div>
  );
};

export default HomePage;
