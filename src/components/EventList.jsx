import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios.jsx";
import { toast } from "react-toastify";

export default function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    api.get("/events").then(r => setEvents(r.data)).catch(() => toast.error("Failed to load"));
  }, []);

  const del = async (id) => {
    try {
      await api.delete(`/events/${id}`);
      setEvents(e => e.filter(x => x.id !== id));
      toast.success("Event deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Your Events</h2>
        <Link to="/add" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Add Event</Link>
      </div>
      {events.length === 0 ? (
        <p className="text-gray-500">No events yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {events.map(ev => (
            <div key={ev.id} className="p-4 bg-white rounded-xl shadow">
              <h3 className="text-xl font-bold text-blue-600">{ev.name}</h3>
              <p className="text-gray-700">🕒 {new Date(ev.startAt).toLocaleString()}</p>
              <p className="text-gray-700">📍 {ev.location}</p>
              <p className="text-gray-700">🏷️ Type: {ev.type} | Priority: {ev.priority}</p>
              <div className="mt-3 flex gap-2">
                <Link to={`/event/${ev.id}`} className="px-3 py-1 bg-green-600 text-white rounded-md">View</Link>
                <Link to={`/edit/${ev.id}`} className="px-3 py-1 bg-yellow-500 text-white rounded-md">Edit</Link>
                <button onClick={() => del(ev.id)} className="px-3 py-1 bg-red-600 text-white rounded-md">Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
