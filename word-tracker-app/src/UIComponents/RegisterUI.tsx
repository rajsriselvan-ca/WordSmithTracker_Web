import React from "react";
import { RegisterUIProps } from "../Types/RegisterUIProps_Types";
import Loader from "../UIComponents/Loader"; 

const RegisterUI: React.FC<RegisterUIProps> = ({
  username,
  email,
  dailyGoal,
  error,
  loading, 
  onUsernameChange,
  onEmailChange,
  onDailyGoalChange,
  onRegister,
  onNavigate,
}) => (
  <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
    {loading && ( 
      <div className="absolute inset-0 bg-gray-50 bg-opacity-75 flex justify-center items-center rounded-lg">
        <Loader />
      </div>
    )}
    <h1 className="text-2xl mb-6 text-theme">Register</h1>
    <input
      type="text"
      value={username}
      onChange={(e) => onUsernameChange(e.target.value)}
      placeholder="Enter your username"
      className="mb-4 p-2 w-full max-w-sm border rounded"
      disabled={loading} 
    />
    <input
      type="email"
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      placeholder="Enter your email"
      className="mb-4 p-2 w-full max-w-sm border rounded"
      disabled={loading} 
    />
    <input
      type="number"
      value={dailyGoal}
      onChange={(e) => onDailyGoalChange(e.target.value)}
      placeholder="Set Daily Goal (1-20)"
      className="mb-4 p-2 w-full max-w-sm border rounded"
      min={1}
      max={20}
      disabled={loading} 
    />
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <button
      onClick={onRegister}
      className={`bg-highlighter text-white px-4 py-2 rounded transition ${
        loading ? "cursor-not-allowed opacity-50" : "hover:bg-highlighterLite"
      }`}
      disabled={loading} 
    >
      {loading ? "Registering..." : "Register"}
    </button>
    <p
      className={`mt-4 text-highlighter cursor-pointer font-thin ${
        loading ? "pointer-events-none opacity-50" : ""
      }`}
      onClick={onNavigate}
    >
      Already have an account? Sign In
    </p>
  </div>
);

export default RegisterUI;
