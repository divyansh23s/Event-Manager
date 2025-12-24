import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import api from "../src/api/axios";

export default function Profile() {
  const { user, updateUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    position: "",
    location: "",
    bio: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
        position: user.position || "",
        location: user.location || "",
        bio: user.bio || "",
      });
    }
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [user, location.state?.tab]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        const response = await api.put("/auth/profile", {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.position,
          location: formData.location,
          bio: formData.bio,
        });
        updateUser(response.data.user);
        toast.success("Profile updated successfully");
      } catch (error) {
        toast.error("Error updating profile");
      }
    }
    setIsEditing(!isEditing);
  };

  const handleChangePasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-semibold mb-6 text-gray-900">Profile Settings</h1>
      <p className="text-gray-700 mb-8">Manage your account settings and preferences</p>

      {/* Tab Navigation */}
      <div className="flex space-x-6 border-b border-gray-200 mb-8">
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === "profile" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </button>
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === "preferences" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("preferences")}
        >
          Preferences
        </button>
        <button
          className={`pb-2 text-lg font-medium ${
            activeTab === "security" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("security")}
        >
          Security
        </button>
      </div>

      {activeTab === "profile" && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">{user?.name || "Username"}</h2>
            <button
              className={`px-4 py-2 rounded ${
                isEditing ? "bg-blue-600 text-white hover:bg-blue-700" : "border border-blue-600 text-blue-600 hover:bg-blue-50"
              }`}
              onClick={handleEditToggle}
            >
              {isEditing ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
          <form className="space-y-6 max-w-3xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                disabled={!isEditing}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </form>
        </div>
      )}

      {activeTab === "preferences" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Notification Preferences</h2>
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Email Notifications</p>
                <p className="text-xs text-gray-500">Receive notifications via email</p>
              </div>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={user.emailNotifications ?? true}
                disabled
                className="toggle toggle-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Push Notifications</p>
                <p className="text-xs text-gray-500">Receive push notifications</p>
              </div>
              <input
                type="checkbox"
                name="pushNotifications"
                checked={user.pushNotifications ?? true}
                disabled
                className="toggle toggle-primary"
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-700">Event Reminders</p>
                <p className="text-xs text-gray-500">Get reminded before events start</p>
              </div>
              <input
                type="checkbox"
                name="eventReminders"
                checked={user.eventReminders ?? true}
                disabled
                className="toggle toggle-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Timezone</label>
              <select
                name="timezone"
                value={user.timezone || "Pacific Standard Time (PST)"}
                // disabled
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              >
                <option>Pacific Standard Time (PST)</option>
                <option>Indian Standard Time (IST)</option>
                <option>Central Standard Time (CST)</option>
                <option>Eastern Standard Time (EST)</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {activeTab === "security" && (
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Password & Security</h2>
          <div className="space-y-6 max-w-3xl">
            <div className="flex justify-between items-center border border-gray-200 rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-500">Last changed few months ago</p>
              </div>
              <button
                className="text-blue-600 hover:underline"
                onClick={handleChangePasswordClick}
              >
                Change Password
              </button>
            </div>
            {/* <div className="flex justify-between items-center border border-gray-200 rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security</p>
              </div>
              <button className="text-blue-600 hover:underline">Enable 2FA</button>
            </div> */}
            {/* <div className="flex justify-between items-center border border-gray-200 rounded-md p-4">
              <div>
                <p className="font-medium text-gray-900">Login Sessions</p>
                <p className="text-sm text-gray-500">Manage your active sessions</p>
              </div>
              <button className="text-blue-600 hover:underline">View Sessions</button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
