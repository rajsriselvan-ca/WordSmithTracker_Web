import React from "react";
import { LoginUIProps } from "../Types/LoginUIProps_Types";

const LoginUI: React.FC<LoginUIProps> = ({
  email,
  error,
  loading,
  onEmailChange,
  onLogin,
  onNavigateToRegister,
  onKeyDown,
}) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4 overflow-hidden">
    <img
      src="/logo192.png"
      alt="App Logo"
      className="w-24 h-24 mb-4"
    />
    <h1 className="text-3xl font-bold mb-6">Sign In</h1>
    <input
      type="email"
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      placeholder="Enter your email"
      className="mb-4 p-2 w-full max-w-sm border rounded"
      onKeyDown={onKeyDown}
    />
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <button
      onClick={onLogin}
      className="bg-primary text-white px-4 py-2 rounded hover:bg-lavender-light"
      disabled={loading}
    >
      {loading ? "Logging in..." : "Login"}
    </button>
    <p
      className="mt-4 text-blue-500 cursor-pointer"
      onClick={onNavigateToRegister}
    >
      New user? Register here
    </p>
  </div>
);

export default LoginUI;
