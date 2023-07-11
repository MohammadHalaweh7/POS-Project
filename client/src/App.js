import "./App.css";
import { useEffect } from "react";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Pos from "./Components/POS/Pos/Pos";
import Login from "./Components/Registration/Login/Login";
import Signup from "./Components/Registration/Signup/Signup";
import Products from "./Components/Admin/Admin Components/Products/Products";
import Categories from "./Components/Admin/Admin Components/Categories/Categories";
import UnitOfMeasure from "./Components/Admin/Admin Components/UnitOfMeasure/UnitOfMeasure";
import Dashboard from "./Components/Admin/Admin Components/Dashboard/Dashboard.jsx";
import AdminLayout from "./Components/Admin/AdminLayout";
import axios from "axios";
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
import ProtectedRouter from "Components/ProtectedRouter/ProtectedRouter";
import { ToastContainer } from "react-toastify";

export default function App() {
  const user = useSelector((state) => state.user);

  // function saveCurrentUser() {
  //   const token = localStorage.getItem("user");
  //   const localStorageUser = JSON.parse(token);
  //   setUser(localStorageUser);
  // }

  // useEffect(() => {
  //   if (localStorage.getItem("user")) {
  //     saveCurrentUser();
  //   }
  // }, []);

  const categoriesLoader = async () => {
    if (!user?.email) {
      return redirect("/login");
    }

    try {
      const { data } = await axios.get(
        "http://localhost:5050/product-categories",
        {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const categoryProductUnitsUsersLoader = async () => {
    try {
      const response = await Promise.all([
        axios.get("http://localhost:5050/product-categories", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }),
        axios.get("http://localhost:5050/products"),
        axios.get("http://localhost:5050/unit-of-measure"),
      ]);
      return response;
    } catch (error) {
      return error;
    }
  };

  const productsLoader = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/products");
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const unitLoader = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/unit-of-measure");
      return data;
    } catch (error) {
      return error;
    }
  };
  const routers = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          element: <ProtectedRouter />,
          children: [
            {
              path: "/",
              loader: categoryProductUnitsUsersLoader,
              element: <Pos />,
            },

            {
              path: "dashboard",
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  loader: categoryProductUnitsUsersLoader,
                  element: <Dashboard />,
                },
                {
                  path: "products",
                  loader: productsLoader,
                  element: <Products />,
                },
                {
                  path: "categories",
                  loader: categoriesLoader,
                  element: <Categories />,
                },
                {
                  path: "unitOfMeasure",
                  loader: unitLoader,
                  element: <UnitOfMeasure />,
                },
              ],
            },
          ],
        },
        { path: "login", element: <Login /> },
        { path: "signup", element: <Signup /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <>
      <ToastContainer />
      <RouterProvider router={routers}></RouterProvider>
    </>
  );
}
