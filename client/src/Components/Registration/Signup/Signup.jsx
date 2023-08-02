import { useState, useEffect } from "react";
import HeaderImg from "../HeaderImg/HeaderImg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/features/User/userSlice";
import { toast } from "react-toastify";
import  SignupSchema  from "../../../Schemas/SignupSchema";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loggedIn, setloggedIn] = useState(false);

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      cPassword: "",
    },
    validationSchema: SignupSchema,
    onSubmit: sendRegisterData,
  });

  async function sendRegisterData(values) {
    try {
      const { userName, email, password } = values;
      if (values.password !== values.cPassword) return;
      const { data } = await axios.post("http://localhost:5050/sign-up", {
        userName,
        email,
        password,
      });

      if (data.message === "User registered successfully") {
        toast.success("User registered successfully");
        axios
          .post("http://localhost:5050/login", {
            email,
            password,
          })
          .then((data) => {
            const token = data.data.accessToken;
            localStorage.setItem("accessToken", JSON.stringify(token));
            dispatch(login({ email: values.email, accessToken: token }));
            setloggedIn(true);
            console.log("welcome");
          });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.error === "Email already registered"
      ) {
        toast.error("Email already registered");
      } else {
        console.log(error);
      }
    }
  }
  useEffect(() => {
    if (loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <div className={`flexBox text-center`}>
      <HeaderImg />
      <div className={`w-25 m-auto`}>
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
            className="btn btn-info mt-3 mb-3 buttonMode"
            style={{ width: "50%" }}
          >
            Register
          </button>

          <p className="textMode">
            Already have an account !! <Link to="/#">Log in</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
