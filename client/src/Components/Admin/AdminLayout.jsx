import { Outlet } from "react-router-dom";
import Sidebar from "./Admin Components/Sidebar/Sidebar";


export default function AdminLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}
