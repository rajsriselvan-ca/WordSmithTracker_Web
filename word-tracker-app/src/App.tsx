import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MenuBar from "./Components/MenuBar";
import Login from "./Components/Login";
import Register from "./Components/Register";
import AddWord from "./Components/AddWord";
import WordList from "./Components/WordList";
import Dashboard from "./Components/Dashboard";
import { AuthProvider } from "../src/Context/AuthContext";
import ProtectedRoute from "./Shared/ProtectedRoute";

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex">
          {userEmail && (
            <MenuBar
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              setUserEmail={setUserEmail}
            />
          )}
          <div className="flex-grow bg-gray-100 p-4">
            <Routes>
              <Route path="/" element={<Login setUserEmail={setUserEmail} />} />
              <Route path="/register" element={<Register />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/add-word" element={<AddWord />} />
                <Route path="/word-list" element={<WordList />} />
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
          </div>
        </div>
      </Router>
     </AuthProvider>
  );
};

export default App;
