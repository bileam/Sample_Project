import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useState } from "react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex  ">
      <div className="">
        <Sidebar Open={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      </div>
      <div className="flex  flex-col w-full ">
        <div className=" w-full ">
          <TopBar setSidebarOpen={setSidebarOpen} />
        </div>
        <main className="pt-16 md:pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
