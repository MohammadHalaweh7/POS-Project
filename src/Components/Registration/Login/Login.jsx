import React, { useState } from "react";
import style from "./Login.module.css";
import HeaderImg from "../HeaderImg/HeaderImg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function Login({ saveCurrentUser }) {
  const [errors, setErrors] = useState([]);
  const [statusError, setStatusError] = useState("");

  const schema = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .email("Not a valid email"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: schema,
    onSubmit: sendLoginData,
  });

  async function sendLoginData(values) {
    const { data } = await axios
      .post(
        "https://king-prawn-app-3mgea.ondigitalocean.app/auth/login",
        values
      )
      .catch((err) => {
        setStatusError(err.response.data.message);
      });
    console.log(data);
    if (data.message === "Done") {
      setErrors([]);
      setStatusError("");
      localStorage.setItem("userToken", data.access_token);
      saveCurrentUser();
      navigate(`/pos`);
      console.log("welcome");
    } else {
      setErrors(data.err[0]);
    }
  }

  const navigate = useNavigate();
  return (
    <div className={style.loginContent}>
      <HeaderImg />
      <div className={`w-25 m-auto`}>
        {<div className="text-danger">{statusError}</div>}
        {errors.map((error) => {
          return <div className="text-danger bg-light">{error.message}</div>;
        })}
        <div className="logo">
          <img
            src="assets/imgs/loginLogo.png"
            alt="Login logo"
            className="w-50"
          />
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control my-3"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? (
            <p className="text-danger text-start">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control my-3"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? (
            <p className="text-danger text-start">{formik.errors.password}</p>
          ) : (
            ""
          )}

          <button
            type="submit"
            className="btn btn-info mt-3 mb-3"
            style={{ width: "50%" }}
          >
            Login
          </button>

          <p>
            Don't have an account !! <Link to="/signup">Rigester Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
