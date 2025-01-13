import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { notifySuccess, notifyError } from "../Shared/Notification"; 
import { LoginProps } from "../Types/Login_Types";
import { LOGIN_USER } from "../GraphQL/Mutations/Login_Mutation";
import {useAuth} from "../Context/AuthContext";
 
const Login: React.FC<LoginProps> = ({ setUserEmail }) => {
  const {login} = useAuth();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    try {
      const { data } = await loginUser({ variables: { email } });
      if (data?.loginUser) {
        const { loginUser: { token, user } } = data;
        login(token, {
          id: user.id,
          username: user.username,
          dailyGoal: user.dailyGoal,
        });
        setUserEmail(email);
        notifySuccess("Login Success", `Welcome ${user.username}`);
        navigate("/add-word");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      notifyError("Login Failed", "An error occurred during login. Please try again.");
      setError("An error occurred. Please try again.");
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
        {loading ? "Logging in..." : "Login"}
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
