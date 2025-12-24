import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthProvider, { useAuth } from "../context/AuthContext";
import Navbar from "./components/navbar.jsx";
import EventList from "./components/EventList";
import EventForm from "./components/eventform.jsx";
import EventDetail from "./components/EventDetail";
import AuthPage from "../pages/AuthPage";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import PublicEvents from "../pages/PublicEvents";
import LandingPage from "../pages/LandingPage";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/auth" replace />;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
        <ToastContainer position="top-right" autoClose={3000} />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppShell() {
  const location = useLocation();
  const isLanding = location.pathname === "/";

  return (
    <div className={isLanding ? "" : "max-w-7xl mx-auto px-4 py-6"}>
      <Navbar />
      <Routes>
          <Route path="/" element={<LandingRoute />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/login" element={<Navigate to="/auth" replace />} />
          <Route path="/signup" element={<Navigate to="/auth" replace />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/add"
            element={
              <PrivateRoute>
                <EventForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <PrivateRoute>
                <EventForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/event/:id"
            element={
              <PrivateRoute>
                <EventDetail />
              </PrivateRoute>
            }
          />
          <Route
            path="/events"
            element={
              <PrivateRoute>
                <EventList />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/event-form"
            element={
              <PrivateRoute>
                <EventForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/public-events"
            element={
              <PrivateRoute>
                <PublicEvents />
              </PrivateRoute>
            }
          />
      </Routes>
    </div>
  );
}

function LandingRoute() {
  const { user } = useAuth();
  return user ? <Navigate to="/dashboard" replace /> : <LandingPage />;
}
