import React from "react";
import { toast } from "react-toastify";

export default function EventCard({ event, onRegister }) {
  const handleRegister = async () => {
    if (onRegister) {
      await onRegister(event.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold mb-1">{event.name}</h3>
      <p className="text-gray-600 mb-1">📅 {new Date(event.startAt).toLocaleString()}</p>
      <p className="text-gray-600 mb-1">📍 Location: {event.location}</p>
      {event.description && <p className="text-gray-600 mb-2">{event.description}</p>}
      <p className="text-sm text-gray-500 mb-2">Type: {event.type} | Priority: {event.priority}</p>
      <button
        onClick={handleRegister}
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
      >
        Register
      </button>
    </div>
  );
}
