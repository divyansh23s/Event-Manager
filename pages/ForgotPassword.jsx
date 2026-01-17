import React, { useState } from "react";
import api from "../src/api/axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/forgot-password", { email });
      toast.success("Reset token generated! Copy it for reset.");
      setToken(res.data.resetToken);
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.message || "Something went wrong"));
    }
  };

  const copyToken = async () => {
    if (token) {
      try {
        await navigator.clipboard.writeText(token);
        toast.success("Token copied to clipboard!");
        navigate("/reset-password");
      } catch (err) {
        toast.error("Failed to copy token");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm"
      >
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Request Reset
        </button>
        {token && (
          <div className="mt-4 p-3 bg-gray-50 rounded border">
            <p className="text-sm font-medium text-gray-700 mb-2">Reset Token:</p>
            <p className="font-mono text-xs bg-white p-2 border rounded break-all mb-2">{token}</p>
            <button
              type="button"
              onClick={copyToken}
              className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 mr-2"
            >
              Copy Token
            </button>
            <Link
              to="/reset-password"
              className="text-blue-600 hover:underline text-sm"
            >
              Go to Reset Password
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
