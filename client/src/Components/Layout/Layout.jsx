import Navbar from "Components/Admin/Admin Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Layout() {
  const user = useSelector((state) => state.user.email);
  return (
    <>
      {user ? <Navbar /> : ""}

      <Outlet />
    </>
  );
}
