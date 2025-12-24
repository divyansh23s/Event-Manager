import { Link } from "react-router-dom";

export default function UpcomingEvents({ events }) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Upcoming Events</h3>
        <Link to="/events" className="text-blue-600 hover:underline text-sm">View all</Link>
      </div>
      {events.length === 0 ? (
        <p className="text-gray-500">No upcoming events.</p>
      ) : (
        <ul className="space-y-3">
          {events.map(event => (
            <li key={event.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold">{event.name}</h4>
                <p className="text-xs text-gray-600">
                  📅 {new Date(event.startAt).toLocaleDateString()} &nbsp; 🕒 {new Date(event.startAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
                <p className="text-xs text-gray-600">📍 {event.location}</p>
              </div>
              <div className="flex flex-col gap-1 text-xs">
                <span className={`rounded px-2 py-0.5 ${
                  event.priority === 'high' ? 'bg-red-200 text-red-700' :
                  event.priority === 'medium' ? 'bg-yellow-200 text-yellow-700' :
                  'bg-orange-200 text-orange-700'
                }`}>
                  {event.priority}
                </span>
                <span className={`rounded px-2 py-0.5 ${
                  event.type === 'professional' ? 'bg-blue-200 text-blue-700' : 'bg-purple-200 text-purple-700'
                }`}>
                  {event.type}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
