import { useState } from "react";
import people from "../../assets/Person.svg";
import { logOut } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const TopBar = ({ setSidebarOpen }) => {
  const [open, setOpen] = useState(false);
  const [burger, setBurger] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate("/login");
  };

  const handleToggleBurger = () => {
    setBurger((prev) => !prev);
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="w-full fixed top-0 left-0 z-50 bg-white shadow-md flex justify-between items-center px-3 py-3 md:px-7">
      <div className="flex items-center gap-3">
        <button
          onClick={handleToggleBurger}
          className="flex flex-col justify-center items-center w-10 h-10 gap-1 lg:hidden"
        >
          <div
            className={`w-6 h-0.5 bg-blue-600 transition-transform duration-300 ${
              burger ? "rotate-45 translate-y-2" : ""
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-blue-600 transition-opacity duration-300 ${
              burger ? "opacity-0" : "opacity-100"
            }`}
          ></div>
          <div
            className={`w-6 h-0.5 bg-blue-600 transition-transform duration-300 ${
              burger ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></div>
        </button>

        <h1 className="text-[1.2rem] font-semibold">Dashboard</h1>
      </div>

      {/* Right: User */}
      <div className="flex items-center gap-3 md:gap-5 relative">
        <img src={people} alt="User" className="w-8 h-8 rounded-full" />

        <div className="relative">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-1 cursor-pointer select-none"
          >
            <h1 className="font-medium">Admin</h1>
            <span
              className={`inline-block font-extrabold transition-transform duration-300 ${
                open ? "rotate-270" : "rotate-90"
              }`}
            >
              &gt;
            </span>
          </button>

          {/* Dropdown */}
          <div
            className={`absolute right-0 mt-2 w-28 bg-blue-600 text-white rounded shadow-md p-2 transition-all duration-300 ease-in-out ${
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <button
              onClick={handleLogout}
              className="w-full text-left hover:bg-blue-500 p-1 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
