
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../src/api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [loginForm, setLoginForm] = useState({ email: "", password: "", remember: false });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showRegisterConfirmPassword, setShowRegisterConfirmPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email.trim() || !loginForm.password) {
      toast.error("Email & password required");
      return;
    }
    try {
      const { data } = await api.post("/auth/login", { email: loginForm.email, password: loginForm.password });
      login(data.user, data.token);
      toast.success("Logged in");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Login failed");
    }
  };

  const submitRegister = async (e) => {
    e.preventDefault();
    if (!registerForm.name.trim() || !registerForm.email.trim() || !registerForm.password || !registerForm.confirmPassword) {
      toast.error("All fields required");
      return;
    }
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await api.post("/auth/register", {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
      });
      login(data.user, data.token);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (e) {
      toast.error(e?.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#dbe9ff] px-4">
      <div className="max-w-sm w-full bg-white rounded-lg p-6 shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">EventManager</h1>
          <p className="text-xs text-gray-600">Organize your events, manage your schedule</p>
        </div>
        <div className="bg-white rounded-md shadow p-4">
          <div className="flex border border-gray-300 rounded-md overflow-hidden mb-4">
            <button
              className={`flex-1 py-2 text-xs font-semibold rounded-l-md ${
                activeTab === "login" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              className={`flex-1 py-2 text-xs font-semibold rounded-r-md ${
                activeTab === "register" ? "bg-blue-600 text-white" : "bg-white text-gray-700"
              }`}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>

          {activeTab === "login" && (
            <form onSubmit={submitLogin} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold mb-1" htmlFor="loginEmail">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="loginEmail"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md py-1.5 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  />
                  <svg
                    className="w-4 h-4 absolute left-2 top-2.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m0 0l4-4m0 8l-4-4" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold mb-1" htmlFor="loginPassword">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="loginPassword"
                    type={showLoginPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full border border-gray-300 rounded-md py-1.5 pl-8 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                  <svg
                    className="w-4 h-4 absolute left-2 top-2.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 11c0-1.104-.896-2-2-2s-2 .896-2 2 .896 2 2 2 2-.896 2-2z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z"
                    />
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showLoginPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.104.896-2 2-2a9.96 9.96 0 014.875 1.825"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-gray-600">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={loginForm.remember}
                    onChange={(e) => setLoginForm({ ...loginForm, remember: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="ml-2">Remember me</span>
                </label>
                <Link to="/forgot-password" className="text-blue-600 hover:underline text-[10px]">
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            </form>
          )}

          {activeTab === "register" && (
            <form onSubmit={submitRegister} className="space-y-3">
              <div>
                <label className="block text-[10px] font-semibold mb-1" htmlFor="registerName">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    id="registerName"
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm({ ...registerForm, name: e.target.value })}
                  />
                  <svg
                    className="w-4 h-4 absolute left-2 top-3 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14c2.485 0 4.5-2.015 4.5-4.5S14.485 5 12 5 7.5 7.015 7.5 9.5 9.515 14 12 14z"
                    />
                  </svg>

                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold mb-1" htmlFor="registerEmail">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    id="registerEmail"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-3 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  />
                  <svg
                    className="w-4 h-4 absolute left-2 top-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l9 6 9-6M21 8v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8" />
                  </svg>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold mb-1" htmlFor="registerPassword">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="registerPassword"
                    type={showRegisterPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  />
                  <svg
                    className="w-4 h-4 absolute left-2 top-2.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2h-3V5a3 3 0 10-6 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                    {/* <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z"
                    /> */}
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showRegisterPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.104.896-2 2-2a9.96 9.96 0 014.875 1.825"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-semibold mb-1" htmlFor="registerConfirmPassword">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="registerConfirmPassword"
                    type={showRegisterConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className="w-full border border-gray-300 rounded-md py-2 pl-8 pr-8 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  />
                  <svg
                    className="w-4 h-4 absolute left-2 top-2.5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2V9a2 2 0 00-2-2h-3V5a3 3 0 10-6 0v2H6a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                    {/* <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z"
                    /> */}
                  </svg>
                  <button
                    type="button"
                    onClick={() => setShowRegisterConfirmPassword(!showRegisterConfirmPassword)}
                    className="absolute right-2 top-2.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                    tabIndex={-1}
                  >
                    {showRegisterConfirmPassword ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.104.896-2 2-2a9.96 9.96 0 014.875 1.825"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 text-white rounded-md text-xs font-semibold hover:bg-blue-700 transition"
              >
                Create Account
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
