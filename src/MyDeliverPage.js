import React, { useState } from 'react';

const MyDeliverPage = () => {
  // Initial delivery data
  const [deliveries, setDeliveries] = useState([
    {
      id: 'DEL001',
      name: 'Electronics Package',
      from: 'Warehouse A',
      location: 'New Delhi',
      rescheduledTime: '2024-09-12T15:00:00',
    },
    {
      id: 'DEL002',
      name: 'Furniture Package',
      from: 'Store B',
      location: 'Mumbai',
      rescheduledTime: '2024-09-13T09:00:00',
    },
    {
      id: 'DEL003',
      name: 'Clothing Package',
      from: 'Fashion Outlet',
      location: 'Chennai',
      rescheduledTime: '2024-09-15T12:00:00',
    },
  ]);

  const [selectedDelivery, setSelectedDelivery] = useState(null);
  const [newRescheduleTime, setNewRescheduleTime] = useState('');

  // Function to handle rescheduling
  const handleReschedule = (delivery) => {
    setSelectedDelivery(delivery);
    setNewRescheduleTime(delivery.rescheduledTime);
  };

  const submitReschedule = () => {
    if (selectedDelivery) {
      const updatedDeliveries = deliveries.map((delivery) =>
        delivery.id === selectedDelivery.id
          ? { ...delivery, rescheduledTime: newRescheduleTime }
          : delivery
      );
      setDeliveries(updatedDeliveries);
      setSelectedDelivery(null);
    }
  };

  return (
    <div className="my-deliver-page p-6 bg-gray-100 min-h-screen">
      <header className="my-deliver-header mb-8">
        <h1 className="text-3xl font-bold text-green-600 mb-2">My Deliveries</h1>
      </header>

      <section className="my-deliver-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deliveries.length > 0 ? (
          deliveries.map((delivery) => (
            <div
              key={delivery.id}
              className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 transition-transform transform hover:scale-105"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-4">{delivery.name}</h2>
              <p className="text-gray-600"><strong>Delivery ID:</strong> {delivery.id}</p>
              <p className="text-gray-600"><strong>From:</strong> {delivery.from}</p>
              <p className="text-gray-600"><strong>Location:</strong> {delivery.location}</p>
              <p className="text-gray-600"><strong>Rescheduled Time:</strong> {new Date(delivery.rescheduledTime).toLocaleString()}</p>

              <button
                onClick={() => handleReschedule(delivery)}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Reschedule
              </button>

              {/* Conditionally render reschedule form if this delivery is selected */}
              {selectedDelivery && selectedDelivery.id === delivery.id && (
                <div className="reschedule mt-4 p-4 border rounded shadow-lg bg-yellow-100">
                  <h3 className="text-xl font-semibold text-yellow-700 mb-2">Reschedule Delivery</h3>
                  <input
                    type="datetime-local"
                    value={newRescheduleTime}
                    onChange={(e) => setNewRescheduleTime(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)} // Ensuring reschedule time is in the future
                    className="w-full p-2 border rounded"
                  />
                  <button
                    onClick={submitReschedule}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Submit Reschedule
                  </button>
                  <button
                    onClick={() => setSelectedDelivery(null)}
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No deliveries scheduled at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default MyDeliverPage;
