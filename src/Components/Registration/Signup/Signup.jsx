import React from "react";
import style from "./Signup.module.css";
import HeaderImg from "../HeaderImg/HeaderImg";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div className={style.signUpContent}>
      <HeaderImg />
      <div className={`w-25 m-auto`}>
        <form action="">
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            className="form-control my-3"
          />
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
          <input
            type="password"
            name="cPassword"
            placeholder="Confirm Password"
            className="form-control my-3"
          />

          <button
            type="submit"
            className="btn btn-info mt-3 mb-3"
            style={{ width: "50%" }}
          >
            Register
          </button>

          <p>
            Already have an account !! <Link to="/#">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
