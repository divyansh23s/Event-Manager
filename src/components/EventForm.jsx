import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios.jsx";
import { toast } from "react-toastify";

export default function EventForm() {
  const { id } = useParams();
  const [form, setForm] = useState({ name: "", startAt: "", location: "", description: "", type: "personal", priority: "medium" });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      api.get(`/events/${id}`).then(({ data }) => {
        const iso = new Date(data.startAt);
        const local = new Date(iso.getTime() - iso.getTimezoneOffset()*60000)
          .toISOString().slice(0,16); // yyyy-MM-ddTHH:mm
        setForm({ name: data.name, startAt: local, location: data.location, description: data.description || "", type: data.type || "personal", priority: data.priority || "medium" });
      }).catch(() => toast.error("Failed to load event"));
    }
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.startAt || !form.location.trim()) {
      toast.error("Name, start time, and location are required"); return;
    }
    try {
      const payload = {
        ...form,
        startAt: new Date(form.startAt).toISOString(), // send ISO
      };
      if (id) {
        await api.put(`/events/${id}`, payload);
        toast.success("Event updated");
      } else {
        await api.post(`/events`, payload);
        toast.success("Event created");
      }
      navigate("/dashboard");
    } catch {
      toast.error("Save failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Event" : "Add Event"}</h2>
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded-lg p-2" placeholder="Event name"
          value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
        <input type="datetime-local" className="w-full border rounded-lg p-2"
          value={form.startAt} onChange={e => setForm(f => ({ ...f, startAt: e.target.value }))} />
        <input className="w-full border rounded-lg p-2" placeholder="Location"
          value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
        <textarea className="w-full border rounded-lg p-2" placeholder="Description"
          value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows="3" />
        <select className="w-full border rounded-lg p-2"
          value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
          <option value="personal">Personal</option>
          <option value="professional">Professional</option>
        </select>
        <select className="w-full border rounded-lg p-2"
          value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button className="w-full py-2 bg-blue-600 text-white rounded-lg">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
