// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux/es/hooks/useSelector";
import { Link } from "react-router-dom";
// import { logout } from "redux/features/userSlice";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  // const user = useSelector((state) => state.user)
  const location = useLocation().pathname;
  const title =
    location === "/"
      ? "POS"
      : (location.split("/").slice(-1)[0] ?? "").toUpperCase();

  const handleLogout = () => {
    sessionStorage.clear();
    // dispatch(logout())
    setTimeout(() => {
      navigate("/login");
    }, 100);
    console.log("logout");
  };

  // if (user.email) {
  return (
    <nav
      style={{ zIndex: 2 }}
      className="navbar navbar-expand-md navbar-dark bg-dark p-3 justify-content-between w-100 top-0 left-0 highIndex ps-5 me-5 position-fixed"
    >
      <div className="flex-row d-flex ms-4">
        <Link className="navbar-brand" to="/dashboard">
          {title}
        </Link>
      </div>
      <div>
        <ul className="navbar-nav me-5">
          <>
            <li className="nav-item active ">
              <Link className="nav-link " to="/">
                Home
              </Link>
            </li>
            <li className="nav-item active ">
              <Link className="nav-link " to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                to="/#"
                data-toggle="collapse"
                onClick={handleLogout}
              >
                Logout
              </Link>
            </li>
          </>
        </ul>
      </div>
    </nav>
  );
  // }
}
