import { NavLink } from "react-router-dom";
import dasboardlogo from "../../assets/icont/Dasboardkita.svg";
import users from "../../assets/icont/users.svg";
import items from "../../assets/icont/items.svg";
import transaksi from "../../assets/icont/transaktions.svg";
import report from "../../assets/icont/report.svg";

const Sidebar = ({ Open, setSidebarOpen }) => {
  const BaseClass =
    "flex items-center gap-2 p-2 rounded hover:bg-blue-800 transition-colors duration-300";
  const ActiveClass = "bg-blue-900";

  const sidebarMenu = [
    { label: "Dashboard", path: "/dashboard", icon: dasboardlogo },
    { label: "Master User", path: "/master-user", icon: users },
    { label: "Master Item", path: "/master-item", icon: items },
    { label: "Transaksi", path: "/transaksi", icon: transaksi },
    { label: "Report", path: "/report", icon: report },
  ];

  return (
    <aside
      className={`
        h-screen bg-[#153469] text-white p-4 z-50
        transform transition-transform duration-300 ease-in-out
        lg:relative lg:translate-x-0 lg:w-60 md:block
        ${
          Open
            ? "fixed top-0 left-0 w-52 translate-x-0"
            : "fixed top-0 left-0 w-52 -translate-x-full"
        }
        overflow-hidden
      `}
    >
      <div className="flex justify-end mb-6 md:hidden">
        {Open && (
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-white text-xl font-bold hover:text-red-400 transition"
          >
            &times;
          </button>
        )}
      </div>

      <div className="flex items-center justify-start mb-6">
        <h1 className="text-lg font-bold whitespace-nowrap">Admin Kita</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {sidebarMenu.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            onClick={() => Open && setSidebarOpen(false)} // menutup hanya di mobile
            className={({ isActive }) =>
              `${BaseClass} ${isActive ? ActiveClass : ""}`
            }
          >
            <img src={item.icon} alt={item.label} className="w-5 h-5" />
            <span className="ml-2 whitespace-nowrap">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
