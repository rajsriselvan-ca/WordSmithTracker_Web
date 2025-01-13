import React, { createContext, useState, useContext, useEffect } from "react";
import { AuthContextType } from "../Types/AuthContext_Types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userDetails, setUserDetails] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    const savedUser = localStorage.getItem("userDetails");

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUserDetails(JSON.parse(savedUser));
    }
  }, []);

  const login = (newToken: string, newUser: any) => {
    setToken(newToken);
    setUserDetails(newUser);
    localStorage.setItem("authToken", newToken);
    localStorage.setItem("userDetails", JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUserDetails(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userDetails");
  };

  return (
    <AuthContext.Provider
      value={{
        userDetails,
        token,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
