import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-3 p-3">
      <div className="flex-row d-flex">
        <Link className="navbar-brand" to="/dashboard">
          Dashboard
        </Link>
      </div>

      <div className="navbar-collapse collapse" id="collapsingNavbar">
        <ul className="navbar-nav ms-auto ">
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
        </ul>
      </div>
    </nav>
  );
}
