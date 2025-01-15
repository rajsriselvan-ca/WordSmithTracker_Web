import React from "react";
import {RegisterUIProps} from "../Types/RegisterUIProps_Types"

const RegisterUI: React.FC<RegisterUIProps> = ({
  username,
  email,
  dailyGoal,
  error,
  onUsernameChange,
  onEmailChange,
  onDailyGoalChange,
  onRegister,
  onNavigate,
}) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
    <h1 className="text-3xl font-bold mb-6">Register</h1>
    <input
      type="text"
      value={username}
      onChange={(e) => onUsernameChange(e.target.value)}
      placeholder="Enter your username"
      className="mb-4 p-2 w-full max-w-sm border rounded"
    />
    <input
      type="email"
      value={email}
      onChange={(e) => onEmailChange(e.target.value)}
      placeholder="Enter your email"
      className="mb-4 p-2 w-full max-w-sm border rounded"
    />
    <input
      type="number"
      value={dailyGoal}
      onChange={(e) => onDailyGoalChange(e.target.value)}
      placeholder="Set Daily Goal (1-20)"
      className="mb-4 p-2 w-full max-w-sm border rounded"
      min={1}
      max={20}
    />
    {error && <p className="text-red-500 mb-4">{error}</p>}
    <button
      onClick={onRegister}
      className="bg-primary text-white px-4 py-2 rounded hover:bg-lavender-light"
    >
      Register
    </button>
    <p
      className="mt-4 text-blue-500 cursor-pointer"
      onClick={onNavigate}
    >
      Already have an account? Sign In
    </p>
  </div>
);

export default RegisterUI;
