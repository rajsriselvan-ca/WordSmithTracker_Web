import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaPlus, FaList, FaChartBar, FaSignOutAlt, FaChevronLeft } from "react-icons/fa";
import { MenuBarUIProps } from "../Types/MenuBarUIProps_Types";

const MenuBarUI: React.FC<MenuBarUIProps> = ({
  isSidebarOpen,
  handleLogout,
  setIsSidebarOpen,
  isActive,
}) => {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false); 
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setIsSidebarOpen]);

  return (
    <div
      className={`bg-theme text-white flex flex-col justify-between transition-all duration-300 ${
        isSidebarOpen ? "w-72" : "w-20"
      }`}
    >
      <div className="p-4 flex items-center">
        <div className={`text-3xl ${isSidebarOpen ? "" : "mx-auto"}`}>
          <img
            src="/logo192.png"
            alt="App Logo"
            className={`${
              isSidebarOpen ? "w-[200px] h-[150px] mb-4" : "w-16 h-16"
            } transition-all duration-300`}
          />
        </div>
      </div>
      <ul
        className={`flex-grow space-y-4 p-4 ${
          isSidebarOpen ? "" : "space-y-6"
        }`}
      >
        <li>
          <Link
            to="/add-word"
            className={`flex items-center space-x-4 p-2 rounded ${
              isActive("/add-word") ? "bg-primary" : ""
            }`}
          >
            <div
              className={`${
                isSidebarOpen ? "text-xl" : "text-3xl"
              } transition-all`}
            >
              <FaPlus />
            </div>
            {isSidebarOpen && (
              <span>
                <span className="font-bold">Add Word</span>
                <p className="text-sm text-gray-300">
                  Save new vocabulary words
                </p>
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/word-list"
            className={`flex items-center space-x-4 p-2 rounded ${
              isActive("/word-list") ? "bg-primary" : ""
            }`}
          >
            <div
              className={`${
                isSidebarOpen ? "text-xl" : "text-3xl"
              } transition-all`}
            >
              <FaList />
            </div>
            {isSidebarOpen && (
              <span>
                <span className="font-bold">Word List</span>
                <p className="text-sm text-gray-300">View saved vocabulary</p>
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center space-x-4 p-2 rounded ${
              isActive("/dashboard") ? "bg-primary" : ""
            }`}
          >
            <div
              className={`${
                isSidebarOpen ? "text-xl" : "text-3xl"
              } transition-all`}
            >
              <FaChartBar />
            </div>
            {isSidebarOpen && (
              <span>
                <span className="font-bold">Dashboard</span>
                <p className="text-sm text-gray-300">Track your progress</p>
              </span>
            )}
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={`flex items-center space-x-4 p-2 rounded cursor-pointer bg-transparent border-none text-left ${
              isActive("/") ? "bg-primary" : ""
            }`}
          >
            <div
              className={`${
                isSidebarOpen ? "text-xl" : "text-3xl"
              } transition-all`}
            >
              <FaSignOutAlt />
            </div>
            {isSidebarOpen && (
              <span>
                <span className="font-bold">Logout</span>
                <p className="text-sm text-gray-300">End your session</p>
              </span>
            )}
          </button>
        </li>
      </ul>
      <div
        className="p-4 flex items-center cursor-pointer"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <div className={`text-2xl ${isSidebarOpen ? "" : "mx-auto"}`}>
          <FaChevronLeft
            className={`${
              isSidebarOpen ? "" : "rotate-180"
            } transition-transform`}
          />
        </div>
        {isSidebarOpen && <span className="ml-4 font-bold">Collapse</span>}
      </div>
    </div>
  );
};

export default MenuBarUI;
