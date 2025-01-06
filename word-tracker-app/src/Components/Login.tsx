import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { notifySuccess } from "../Shared/Notification.ts"; 
import {LoginProps} from "../Types/Login_Types.ts";
import {GET_USER} from "../GraphQL/Queries/User_Queries.ts";

const Login: React.FC<LoginProps> = ({ setUserEmail }) => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [getUser, { loading }] = useLazyQuery(GET_USER);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    try {
      const { data } = await getUser({ variables: { email } });

      if (data?.getUser) {
        const {getUser: {username, id, dailyGoal}} = data;
        setUserEmail(email);
        localStorage.setItem("userDetails", JSON.stringify({ id: id, username: username, dailyGoal: dailyGoal }));
        notifySuccess("Login Success", `Welcome ${username}`)
        navigate("/add-word");
      } else {
        setError("User not found. Please register first.");
      }
    } catch (err) {
      setError("An error occurred while checking the user. Please try again.");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
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
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="mb-4 p-2 w-full max-w-sm border rounded"
        onKeyDown={handleKeyDown}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleLogin}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-lavender-light"
        disabled={loading}
      >
        {loading ? "Checking..." : "Login"}
      </button>
      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={() => navigate("/register")}
      >
        New user? Register here
      </p>
    </div>
  );
  
};

export default Login;
