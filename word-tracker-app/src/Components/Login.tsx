import React from "react";
import LoginUI from "../UIComponents/LoginUI";
import { useLogin } from "../CustomHooks/UseLogin";

const Login: React.FC = () => {
  const {
    email,
    error,
    loading,
    setEmail,
    handleLogin,
    handleKeyDown,
    navigate,
  } = useLogin();

  return (
    <LoginUI
      email={email}
      error={error}
      loading={loading}
      onEmailChange={setEmail}
      onLogin={handleLogin}
      onNavigateToRegister={() => navigate("/register")}
      onKeyDown={handleKeyDown}
    />
  );
};

export default Login;
