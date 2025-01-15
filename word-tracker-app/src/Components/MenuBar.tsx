import React from "react";
import { useLocation } from "react-router-dom";
import MenuBarUI from "../UIComponents/MenuBarUI";
import { MenuBarProps } from "../Types/MenuBar_Types";
import { useLogout } from "../Shared/Logout";

const MenuBar: React.FC<MenuBarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const handleLogout = useLogout();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <MenuBarUI
      isSidebarOpen={isSidebarOpen}
      handleLogout={handleLogout}
      setIsSidebarOpen={setIsSidebarOpen}
      isActive={isActive}
    />
  );
};

export default MenuBar;
