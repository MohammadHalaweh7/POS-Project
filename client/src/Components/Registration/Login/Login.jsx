import { useEffect, useState } from "react";
import HeaderImg from "../HeaderImg/HeaderImg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/User/userSlice";
import { toast } from "react-toastify";
import LoginSchema from "../../../Schemas/LoginSchema";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setloggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: sendLoginData,
  });

  async function sendLoginData(values) {
    try {
      const { data } = await axios.post(`http://localhost:5050/login`, {
        ...values,
      });

      if (data === "Password is incorrect") {
        toast.error("Password is incorrect");
      }

      if (data.accessToken) {
        const token = data.accessToken;
        localStorage.setItem("accessToken", JSON.stringify(token));
        const user = { email: values.email, accessToken: data.accessToken };
        dispatch(login(user));
        setloggedIn(true);
        console.log("welcome");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  return (
    <div className={`flexBox text-center`}>
      <HeaderImg />
      <div className={`w-25 m-auto`}>
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
            className="btn btn-info mt-3 mb-3 buttonMode"
            style={{ width: "50%" }}
          >
            Login
          </button>

          <p className="textMode">
            Don't have an account !! <Link to="/signup">Rigester Now</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
