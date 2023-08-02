import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouter() {
  const user = useSelector((state) => state.user);
  return !user.email ? (
    <Navigate to="/login" />
  ) : (
    <Outlet />
  );
}
