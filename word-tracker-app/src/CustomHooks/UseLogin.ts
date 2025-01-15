import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { notifySuccess, notifyError } from "../Shared/Notification";
import { LOGIN_USER } from "../GraphQL/Mutations/Login_Mutation";
import { useAuth } from "../Context/AuthContext";

export const useLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loginUser, { loading }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (!email || !validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);

    try {
      const { data } = await loginUser({ variables: { email } });
      if (data?.loginUser) {
        const {
          loginUser: { token, user },
        } = data;
        login(token, {
          id: user.id,
          username: user.username,
          dailyGoal: user.dailyGoal,
        });
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return {
    email,
    error,
    loading,
    setEmail,
    handleLogin,
    handleKeyDown,
    navigate,
  };
};
