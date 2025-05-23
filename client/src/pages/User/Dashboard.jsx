import React from "react";
import SideNav from "../../components/Dashboard/SideNav";
import Nav from "../../components/Dashboard/Nav";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex w-full min-h-screen bg-gray-100">
      {/* Sidebar */}
      <SideNav />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Top navigation */}
        <Nav />

        {/* Content changes based on route */}
        <div className="p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
