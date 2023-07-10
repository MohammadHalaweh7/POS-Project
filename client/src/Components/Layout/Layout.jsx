import Navbar from "Components/Admin/Admin Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
