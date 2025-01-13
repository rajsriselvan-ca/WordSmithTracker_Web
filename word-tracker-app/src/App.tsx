import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import AuthContent from "./Shared/AuthContent";

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState<boolean>(true);
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex">
          <AuthContent isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
