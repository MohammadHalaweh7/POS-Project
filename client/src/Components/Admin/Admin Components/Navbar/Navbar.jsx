import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./../../../../App.js";

export default function Navbar({ title, width }) {
  const { user } = useContext(UserContext);
  console.log("-----------------------------");
  console.log(user);
  console.log("-----------------------------");
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark p-3 position-fixed w-100 top-0 right-0 highIndex">
      <div className={width}>
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
          <ul className="navbar-nav ms-auto ">
            {user ? (
              <>
                <li className="nav-item active ">
                  <Link className="nav-link " to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/#" data-toggle="collapse">
                    Logout
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active ">
                  <Link className="nav-link " to="/dashboard">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item active ">
                  <Link className="nav-link " to="/dashboard/products">
                    Products
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link className="nav-link" to="/dashboard/categories">
                    Categories
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link className="nav-link" to="/dashboard/UnitOfMeasure">
                    Unit Of Measure
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/#" data-toggle="collapse">
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
