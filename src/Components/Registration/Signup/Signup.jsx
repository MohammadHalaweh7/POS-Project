import React, { useState } from "react";
import style from "./Signup.module.css";
import HeaderImg from "../HeaderImg/HeaderImg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Signup() {
  const [errors, setErrors] = useState([]);
  const [statusError, setStatusError] = useState("");
  const navigate = useNavigate();

  const schema = Yup.object({
    userName: Yup.string()
      .required("name is required")
      .min(3, "min is 3 char")
      .max(10, "max is 10 char"),
    email: Yup.string().required("email is required").email("not valid email"),
    password: Yup.string()
      .required("password is required")
      .matches(/^[A-Z][a-z0-9]{3,7}$/),
    cPassword: Yup.string()
      .required("Confirm password is required")
      .oneOf([Yup.ref("password")], "not match password"),
  });

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: schema,
    onSubmit: sendRegisterData,
  });

  async function sendRegisterData(values) {
    const { data } = await axios
      .post(
        "https://king-prawn-app-3mgea.ondigitalocean.app/auth/signup",
        values
      )
      .catch((err) => {
        setStatusError(err.response.data.message);
      });
    console.log(data);
    if (data.message === "Done") {
      setErrors([]);
      setStatusError("");
      navigate(`/#`);
      console.log("welcome");
    } else {
      setErrors(data.err[0]);
    }
  }
  return (
    <div className={style.signUpContent}>
      <HeaderImg />
      <div className={`w-25 m-auto`}>
        {statusError ? (
          <div className="alert alert-danger text-danger">{statusError}</div>
        ) : (
          ""
        )}
        {errors.map((error) => {
          return (
            <div className=" alert alert-danger bg-light">{error.message}</div>
          );
        })}
        <form action="" onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="userName"
            placeholder="User Name"
            className="form-control my-3"
            value={formik.values.userName}
            onChange={formik.handleChange}
          />
          {formik.errors.userName ? (
            <p className="text-danger text-start">{formik.errors.userName}</p>
          ) : (
            ""
          )}
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
          <input
            type="password"
            name="cPassword"
            placeholder="Confirm Password"
            className="form-control my-3"
            value={formik.values.cPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.cPassword ? (
            <p className=" text-danger text-start">{formik.errors.cPassword}</p>
          ) : (
            ""
          )}
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
