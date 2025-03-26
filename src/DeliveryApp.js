import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const DeliveryApp = () => {
  const [preferredTime, setPreferredTime] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Dummy historical delivery data
  const dummyHistoricalData = [
    { date: "2024-09-01", time: "morning", success: true },
    { date: "2024-09-02", time: "afternoon", success: false },
    { date: "2024-09-03", time: "evening", success: true },
    { date: "2024-09-04", time: "morning", success: true },
    { date: "2024-09-05", time: "afternoon", success: true },
  ];

  // Function to get current IST date and time based on suggested time
  const getCurrentISTDateTime = (suggestedTime) => {
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };

    switch (suggestedTime) {
      case "morning":
        now.setHours(Math.floor(Math.random() * 4) + 8); // 8 AM - 12 PM
        break;
      case "afternoon":
        now.setHours(Math.floor(Math.random() * 4) + 12); // 12 PM - 4 PM
        break;
      case "evening":
        now.setHours(Math.floor(Math.random() * 4) + 16); // 4 PM - 8 PM
        break;
      default:
        now.setHours(8); // Default to 8 AM
        break;
    }

    const date = now.toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" });
    const time = now.toLocaleTimeString("en-IN", options);
    return `${date}, ${time}`;
  };

  // AI-based time suggestion logic
  const simulateAISuggestion = (historicalData, userPreference) => {
    const successCounts = { morning: 0, afternoon: 0, evening: 0 };

    historicalData.forEach((delivery) => {
      if (delivery.success) {
        successCounts[delivery.time]++;
      }
    });

    // If the preferred time has successful deliveries, use it
    if (successCounts[userPreference] > 0) {
      return userPreference;
    }

    // Otherwise, suggest the most successful time slot
    return Object.keys(successCounts).reduce((a, b) =>
      successCounts[a] > successCounts[b] ? a : b
    );
  };

  // Function to get suggested delivery time
  const suggestTime = () => {
    if (!preferredTime) return;
    setIsLoading(true);

    setTimeout(() => {
      const suggestedSlot = simulateAISuggestion(dummyHistoricalData, preferredTime);

      setOrderDetails({
        packageId: Math.floor(10000 + Math.random() * 90000).toString(),
        name: "John Doe",
        location: "Mumbai, India",
        preferredTime: suggestedSlot,
        deliveryDate: getCurrentISTDateTime(suggestedSlot),
      });

      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DynamiDelivers</h1>
        <p>AI-based Customized Time Slot Delivery</p>
      </header>

      <section className="section">
        <h2>Suggest Delivery Time</h2>
        <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)}>
          <option value="">Select preferred time</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </select>

        <button onClick={suggestTime} disabled={isLoading || !preferredTime}>
          {isLoading ? "⏳ Loading..." : "🚀 Suggest Time"}
        </button>

        {/* Displaying suggested order details */}
        {orderDetails && (
          <div className="order-details">
            <h3>Order Details</h3>
            <p><strong>📦 Package ID:</strong> {orderDetails.packageId}</p>
            <p><strong>👤 Name:</strong> {orderDetails.name}</p>
            <p><strong>📍 Location:</strong> {orderDetails.location}</p>
            <p><strong>🕒 Suggested Delivery Time:</strong> {orderDetails.preferredTime}</p>
            <p><strong>📅 Delivery Date and Time (IST):</strong> {orderDetails.deliveryDate}</p>

            <button onClick={() => setOrderDetails(null)}>✅ Confirm</button>
            <button onClick={() => navigate("/my-deliveries")}>📦 Go to My Deliveries</button>
          </div>
        )}
      </section>
    </div>
  );
};

export default DeliveryApp;
