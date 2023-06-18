import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";

export default function DashboardLayout() {
  return (
    <div>
      {/* <Navbar /> */}
      <Sidebar>
        <Outlet />
      </Sidebar>
    </div>
  );
}
