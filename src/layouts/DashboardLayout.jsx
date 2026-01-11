import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

const DashboardLayout = () => {
  const [active, setActive] = useState(false);
  return (
    <div className="flex max-h-[100vh] w-full">
      <Sidebar active={active} setActive={setActive} />
      <div className="flex flex-col flex-grow w-1/2">
        <DashboardNavbar active={active} setActive={setActive} />
        <main className="flex-grow px-2 md:px-4 lg:px-6 bg-white  overflow-y-auto mx-auto w-full hide-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
