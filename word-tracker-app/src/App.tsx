import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import MenuBar from "./Components/MenuBar.tsx";
import Login from "./Components/Login.tsx";
import Register from "./Components/Register.tsx";
import AddWord from "./Components/AddWord.tsx";

const App: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string>("");
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  return (
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
            <Route
              path="/"
              element={<Login setUserEmail={setUserEmail} />}
            />
            <Route path="/register" element={<Register />} />
            <Route
              path="/add-word"
              element={userEmail ? <AddWord /> : <RedirectToAuth />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const RedirectToAuth: React.FC = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate("/");
  }, [navigate]);
  return null;
};

export default App;
