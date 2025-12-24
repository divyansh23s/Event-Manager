import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios.jsx";
import { toast } from "react-toastify";

function useCountdown(targetIso) {
  const [now, setNow] = useState(Date.now());
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  return useMemo(() => {
    if (!targetIso) return { done: false, d:0,h:0,m:0,s:0 };
    const diff = new Date(targetIso).getTime() - now;
    if (diff <= 0) return { done: true, d:0,h:0,m:0,s:0 };
    const d = Math.floor(diff / (24*3600e3));
    const h = Math.floor((diff % (24*3600e3)) / 3600e3);
    const m = Math.floor((diff % 3600e3) / 60e3);
    const s = Math.floor((diff % 60e3) / 1000);
    return { done: false, d, h, m, s };
  }, [targetIso, now]);
}

export default function EventDetail() {
  const { id } = useParams();
  const [ev, setEv] = useState(null);
  const { d, h, m, s, done } = useCountdown(ev?.startAt);

  useEffect(() => {
    api.get(`/events/${id}`).then(({ data }) => setEv(data)).catch(() => toast.error("Not found"));
  }, [id]);

  const registerMe = async () => {
    try {
      await api.post(`/events/${id}/register`);
      toast.success("You are registered for this event 🎉");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Registration failed");
    }
  };

  if (!ev) return <p className="text-gray-500">Loading...</p>;

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-blue-600 mb-2">{ev.name}</h2>
      <p className="text-gray-700">🕒 {new Date(ev.startAt).toLocaleString()}</p>
      <p className="text-gray-700">📍 {ev.location}</p>
      {ev.description && <p className="text-gray-700">📝 {ev.description}</p>}
      <p className="text-gray-700">🏷️ Type: {ev.type} | Priority: {ev.priority}</p>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-1">Countdown</h3>
        {done ? (
          <p className="text-red-600">Event started</p>
        ) : (
          <p className="text-gray-800 text-lg">
            {d}d {h}h {m}m {s}s
          </p>
        )}
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={registerMe} className="px-4 py-2 bg-green-600 text-white rounded-lg">
          Register
        </button>
      </div>
    </div>
  );
}
