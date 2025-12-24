import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import notificationService from "../services/notificationService";
import NotificationDropdown from "./NotificationDropdown";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isAuthPage = location.pathname === "/auth";
  const isLanding = location.pathname === "/";

  const [showNotif, setShowNotif] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  const notifRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch notification count when user changes
  useEffect(() => {
    const fetchNotificationCount = async () => {
      if (user) {
        try {
          const response = await notificationService.getNotificationCount();
          if (response.success) {
            setNotificationCount(response.count);
          }
        } catch (error) {
          console.error("Error fetching notification count:", error);
        }
      } else {
        setNotificationCount(0);
      }
    };

    fetchNotificationCount();
  }, [user]);

  const tabs = [
    { name: "Overview", path: "/dashboard" },
    { name: "Events", path: "/events" },
    { name: "Profile", path: "/profile" },
  ];

  const shellClasses = isLanding
    ? "fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-white/5"
    : "relative bg-white border-b border-gray-200 shadow-sm";
  const brandPrimary = isLanding ? "text-white" : "text-gray-900";
  const brandSecondary = isLanding ? "text-slate-400" : "text-gray-500";

  return (
    <header className={`w-full ${shellClasses}`}>
      <div className="relative max-w-7xl mx-auto flex items-center gap-4 px-6 py-4">
        {!isAuthPage && (
          <Link to="/" className="flex flex-col leading-tight">
            <span className={`text-xl font-bold tracking-tight ${brandPrimary}`}>EventManager</span>
            <span className={`text-[9px] uppercase tracking-[0.8em] font-light ${brandSecondary}`}>EXPERIENCES SUITE</span>
          </Link>
        )}

        {!isAuthPage && user && (
          <nav className="hidden md:flex items-center gap-2 ml-6">
            {tabs.map((tab) => {
              const active = location.pathname === tab.path;
              return (
                <Link
                  key={tab.name}
                  to={tab.path}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    active
                      ? isLanding
                        ? "bg-white/10 text-white backdrop-blur-sm"
                        : "bg-blue-600 text-white shadow"
                      : isLanding
                        ? "text-slate-300 hover:text-white hover:bg-white/5"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>
        )}

        <div className="flex items-center gap-3 ml-auto">
          {user ? (
            <>
              <div className="relative" ref={notifRef}>
                <button
                  onClick={() => setShowNotif(!showNotif)}
                  className={`relative p-2.5 rounded-lg transition-all duration-200 ${
                    isLanding ? "bg-white/5 text-white hover:bg-white/10" : "hover:bg-gray-100 text-gray-700"
                  }`}
                  aria-label="Notifications"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                    />
                  </svg>
                  {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white bg-gradient-to-r from-pink-500 to-rose-500 rounded-full">
                      {notificationCount > 99 ? "99+" : notificationCount}
                    </span>
                  )}
                </button>
                <NotificationDropdown
                  isOpen={showNotif}
                  onClose={() => setShowNotif(false)}
                />
              </div>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isLanding ? "bg-white/5 text-white hover:bg-white/10" : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  <span>Hi, {user.name}</span>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white flex items-center justify-center font-semibold text-sm">
                    {user.name?.[0] ?? "U"}
                  </span>
                </button>
                {showProfile && (
                  <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-2xl z-20 p-4 space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        navigate("/profile");
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                    >
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        navigate("/profile", { state: { tab: "preferences" } });
                        setShowProfile(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-gray-50 hover:bg-gray-100 text-sm text-gray-700 transition-colors"
                    >
                      Preferences
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        navigate("/");
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl bg-rose-50 text-sm text-rose-600 font-semibold hover:bg-rose-100 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            !isAuthPage && (
              <Link
                to="/auth"
                className="inline-flex items-center gap-2 rounded-full bg-white text-blue-600 px-6 py-2.5 text-sm font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  );
}