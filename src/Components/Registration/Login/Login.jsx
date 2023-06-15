import React from "react";
import style from "./Login.module.css";
import HeaderImg from "../HeaderImg/HeaderImg";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div className={style.loginContent}>
      <HeaderImg />
      <div className={`w-25 m-auto`}>
        <div className="logo">
          <img
            src="assets/imgs/loginLogo.png"
            alt="Login logo"
            className="w-50"
          />
        </div>
        <form action="">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control my-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control my-3"
          />

          {/* for test */}
          <Link to="/pos">
            <button
              type="submit"
              className="btn btn-info mt-3 mb-3"
              style={{ width: "50%" }}
            >
              Login
            </button>
          </Link>

          <p>
            Don't have an account !! <Link to="/signup">Rigester Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
