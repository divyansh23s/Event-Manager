import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../src/api/axios";
import { useAuth } from "../context/AuthContext";
import DashboardHeader from "../src/components/dashboard/DashboardHeader";
import StatsCards from "../src/components/dashboard/StatsCards";
import UpcomingEvents from "../src/components/dashboard/UpcomingEvents";
import RecentActivity from "../src/components/dashboard/RecentActivity";
import { toast } from "react-toastify";

function timeAgo(date) {
  const now = new Date();
  const diff = now - new Date(date);
  const seconds = Math.floor(diff / 1000);
  if (seconds < 60) return `${seconds} seconds ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalEventsChange: "",
    upcomingEvents: 0,
    upcomingEventsChange: "",
    pastEvents: 0,
    pastEventsChange: "",
    thisMonth: 0,
    thisMonthChange: "",
  });

  useEffect(() => {
    if (!user) return;

    // Load events for display
    api.get("/events")
      .then((res) => {
        setEvents(res.data);
      })
      .catch(() => toast.error("Failed to load events"));

    // Load real statistics
    api.get("/events/stats")
      .then((res) => {
        setStats(res.data);
      })
      .catch(() => toast.error("Failed to load statistics"));

    api.get("/activities")
      .then((res) => {
        const mappedActivities = res.data.map(activity => {
          if (activity.type === "event") {
            return {
              icon: "📅",
              description: `Created "${activity.data.name}"`,
              timeAgo: timeAgo(activity.data.createdAt),
            };
          } else if (activity.type === "registration") {
            return {
              icon: "✅",
              description: `Registered for "${activity.data.eventName || 'an event'}"`,
              timeAgo: timeAgo(activity.data.createdAt),
            };
          } else {
            return {
              icon: "ℹ️",
              description: "Unknown activity",
              timeAgo: "",
            };
          }
        });
        setRecentActivities(mappedActivities);
      })
      .catch(() => toast.error("Failed to load recent activities"));
  }, [user]);

  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <DashboardHeader userName={user?.name || "User"} />
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, {user?.name || "User"}</h1>
          <p className="text-gray-600">Here's what's happening with your events.</p>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate("/public-events")}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            View Public Events
          </button>
          <button
            onClick={() => navigate("/event-form")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + Create Event
          </button>
        </div>
      </div>
      <StatsCards stats={stats} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <UpcomingEvents events={events.filter(e => new Date(e.startAt) > new Date())} />
        <RecentActivity activities={recentActivities} />
      </div>
    </div>
  );
}
