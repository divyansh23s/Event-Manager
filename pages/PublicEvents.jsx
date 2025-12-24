import React, { useEffect, useState } from "react";
import api from "../src/api/axios";
import EventCard from "../src/components/EventCard";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function PublicEvents() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/events/public/events")
      .then(res => setEvents(res.data))
      .catch(() => toast.error("Failed to load public events"));
  }, []);

  const handleRegister = async (eventId) => {
    try {
      await api.post(`/events/public/events/${eventId}/register`);
      toast.success("Registered successfully");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Back to Dashboard
      </button>
      <h1 className="text-3xl font-bold mb-6">Public Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(event => (
          <EventCard key={event.id} event={event} onRegister={handleRegister} />
        ))}
      </div>
    </div>
  );
}
