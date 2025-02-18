import React from "react";
import RegisterUI from "../UIComponents/RegisterUI";
import { useRegister } from "../CustomHooks/UseRegister";

const Register: React.FC = () => {
  const {
    username,
    email,
    dailyGoal,
    loading,
    error,
    setUsername,
    setEmail,
    handleDailyGoalChange,
    handleRegister,
    navigate,
  } = useRegister();

  return (
    <RegisterUI
      username={username}
      email={email}
      dailyGoal={dailyGoal}
      loading = {loading}
      error={error}
      onUsernameChange={setUsername}
      onEmailChange={setEmail}
      onDailyGoalChange={handleDailyGoalChange}
      onRegister={handleRegister}
      onNavigate={() => navigate("/")}
    />
  );
};

export default Register;
