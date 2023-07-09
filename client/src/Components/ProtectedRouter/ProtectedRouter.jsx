import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRouter() {
  const location = useLocation();
  const user = useSelector((state) => state.user);
  return !user.email ? (
    <Navigate to="/login" state={{ path: location.pathname }} />
  ) : (
    <Outlet />
  );
}
