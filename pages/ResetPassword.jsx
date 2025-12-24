import React, { useState } from "react";
import api from "../src/api/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token.trim()) {
      toast.error("Please enter the reset token");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      await api.post("/auth/reset-password", { token: token.trim(), newPassword });
      toast.success("Password reset successful! You can now log in.");
      // Optionally navigate to login page
    } catch (err) {
      toast.error("Error: " + (err.response?.data?.error || "Something went wrong"));
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-full max-w-sm text-center"
      >
        <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
        <textarea
          placeholder="Paste your reset token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-4 rounded"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded w-full">
          Reset Password
        </button>
        <div className="mt-4 space-x-4">
          <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
          <Link to="/forgot-password" className="text-gray-600 hover:underline">Request New Token</Link>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
