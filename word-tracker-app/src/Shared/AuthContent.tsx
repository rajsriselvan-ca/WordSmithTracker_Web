import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import MenuBar from "../Components/MenuBar";
import Login from "../Components/Login";
import Register from "../Components/Register";
import AddWord from "../Components/AddWord";
import WordList from "../Components/WordList";
import Dashboard from "../Components/Dashboard";
import { useAuth } from "../Context/AuthContext";
import ProtectedRoute from "../Shared/ProtectedRoute";
import {AuthContentProps} from "../Types/AuthContentProps_Types"


const AuthContent: React.FC<AuthContentProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const { isAuthenticated } = useAuth(); 
  const location = useLocation(); 
  const shouldShowMenuBar = isAuthenticated && location.pathname !== "/" &&  location.pathname !== "/register";

  return (
    <>
      {shouldShowMenuBar && (
        <MenuBar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
     <div className="flex-grow bg-gray-100 p-4 sm:p-6 md:p-8 overflow-auto">
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route element={<ProtectedRoute />}>
      <Route path="/add-word" element={<AddWord />} />
      <Route path="/word-list" element={<WordList />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Route>
  </Routes>
</div>
    </>
  );
};

export default AuthContent;
