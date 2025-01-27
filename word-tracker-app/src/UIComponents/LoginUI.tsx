import React from "react";
import { LoginUIProps } from "../Types/LoginUIProps_Types";
import Loader from "../UIComponents/Loader"; 

const LoginUI: React.FC<LoginUIProps> = ({
  email,
  error,
  loading,
  onEmailChange,
  onLogin,
  onNavigateToRegister,
  onKeyDown,
}) => (
  <div className="flex items-center justify-center px-4 bg-gray-100 min-h-screen">
    <div className="w-full max-w-md flex flex-col items-center bg-white p-6 rounded-lg shadow-md relative">
      {loading && ( 
        <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex justify-center items-center rounded-lg">
          <Loader />
        </div>
      )}
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
        disabled={loading} 
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={onLogin}
        className={`bg-highlighter text-white px-4 py-2 rounded transition w-full sm:w-3/4 md:w-1/2 ${
          loading ? "cursor-not-allowed opacity-50" : "hover:bg-highlighterLite"
        }`}
        disabled={loading} 
      >
        {loading ? "Logging in..." : "Login"}
      </button>
      <p
        className={`mt-4 text-highlighter cursor-pointer font-thin ${
          loading ? "pointer-events-none opacity-50" : ""
        }`}
        onClick={onNavigateToRegister}
      >
        New user? Register here
      </p>
    </div>
  </div>
);

export default LoginUI;
