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
  <div className="flex items-center justify-center px-4 bg-gray-100">
    <div className="w-full max-w-md flex flex-col items-center bg-white p-6 rounded-lg shadow-md">
      <img
        src="/logoCurve.png"
        alt="App Logo"
        className="w-[160px] h-[100px] mb-4"
      />
      <h1 className="text-2xl text-theme mb-6 font-light">Sign In</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        placeholder="Enter your email"
        className="mb-4 p-2 w-full border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-highlighter"
        onKeyDown={onKeyDown}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={onLogin}
        className="bg-highlighter text-white px-4 py-2 rounded hover:bg-highlighterLite transition w-full sm:w-3/4 md:w-1/2"
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p
        className="mt-4 text-highlighter cursor-pointer font-thin"
        onClick={onNavigateToRegister}
      >
        New user? Register here
      </p>
    </div>
  </div>
);

export default LoginUI;
