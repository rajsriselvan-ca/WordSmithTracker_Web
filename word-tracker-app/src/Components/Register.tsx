import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, gql } from "@apollo/client";
import { notifyError, notifySuccess } from "../Shared/Notification.ts"; 

const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $dailyGoal: Int!, $createdAt: String!) {
    createUser(username: $username, email: $email, dailyGoal: $dailyGoal, createdAt: $createdAt) {
      username
      email
      dailyGoal
      createdAt
    }
  }
`;

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dailyGoal, setDailyGoal] = useState<number | "">("");
  const [error, setError] = useState<string>(""); 
  const navigate = useNavigate();

  const [createUser] = useMutation(CREATE_USER);

  const handleDailyGoalChange = (value: string) => {
    const numValue = Number(value);
    if (numValue > 0 && numValue <= 20) {
      setDailyGoal(numValue);
      setError("");
    } else if (value === "") {
      setDailyGoal("");
    } else {
      setError("Daily goal must be between 1 and 20.");
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!username || !email || dailyGoal === "") {
      setError("All fields are required.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    try {
      const createdAt = new Date().toISOString(); 
      const { data } = await createUser({
        variables: { username, email, dailyGoal: Number(dailyGoal), createdAt },
      });
      notifySuccess("Success", "User Successfully Created!")
      navigate("/");
    } catch (error) {
      setError("Registration failed. Please try again.");
      notifyError("Error", error.message)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
        className="mb-4 p-2 w-full max-w-sm border rounded"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="mb-4 p-2 w-full max-w-sm border rounded"
      />
      <input
        type="number"
        value={dailyGoal}
        onChange={(e) => handleDailyGoalChange(e.target.value)}
        placeholder="Set Daily Goal (1-20)"
        className="mb-4 p-2 w-full max-w-sm border rounded"
        min={1}
        max={20}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleRegister}
        className="bg-primary text-white px-4 py-2 rounded hover:bg-lavender-light"
      >
        Register
      </button>
      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Already have an account? Sign In
      </p>
    </div>
  );
};

export default Register;
