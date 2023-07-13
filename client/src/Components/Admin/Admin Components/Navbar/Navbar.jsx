import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { logout } from "../../../../redux/features/User/userSlice";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation().pathname;
  const title =
    location === "/"
      ? "POS"
      : (location.split("/").slice(-1)[0] ?? "").toUpperCase();

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch(logout());
    setTimeout(() => {
      navigate("/login");
    }, 100);
    console.log("logout");
  };


  return (
    <>
        <nav
          style={{ zIndex: 2 }}
          className="navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-3 justify-content-between w-100 top-0 left-0 highIndex position-fixed"
        >
          <div className="container">
            <div className="flex-row d-flex">
              <Link className="navbar-brand" to="/dashboard">
                {title}
              </Link>
            </div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsingNavbar"
              aria-controls="collapsingNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-collapse collapse" id="collapsingNavbar">
              <ul className="navbar-nav  ms-auto">
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
          </div>
        </nav>
    </>
  );
}
