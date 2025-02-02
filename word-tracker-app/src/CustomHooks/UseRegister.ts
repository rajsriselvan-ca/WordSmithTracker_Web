import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { notifyError, notifySuccess } from "../Shared/Notification";
import { CREATE_USER } from "../GraphQL/Mutations/User_Mutations";

export const useRegister = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [dailyGoal, setDailyGoal] = useState<number | "">("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); 
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
    setLoading(true); 
    try {
      const createdAt = new Date().toISOString();
      await createUser({
        variables: { username, email, dailyGoal: Number(dailyGoal), createdAt },
      });
      notifySuccess("Success", "User Successfully Created!");
      navigate("/");
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Registration failed. Please try again.";
      setError("Registration failed. Please try again.");
      notifyError("Error", errorMessage);
    } finally {
      setLoading(false); 
    }
  };

  return {
    username,
    email,
    dailyGoal,
    error,
    loading, 
    setUsername,
    setEmail,
    handleDailyGoalChange,
    handleRegister,
    navigate,
  };
};
