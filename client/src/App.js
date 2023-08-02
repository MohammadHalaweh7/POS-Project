import "./App.css";
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
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function App() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  const user = useSelector((state) => state.user);

  console.log({ user });
  const allData = async () => {
    try {
      const response = await Promise.allSettled([
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
      console.log(error);
    }
  };

  const routers = createBrowserRouter([
    {
      path: "",
      loader: allData,
      id: "allDataRoute",
      element: <Layout />,
      children: [
        {
          element: <ProtectedRouter />,
          children: [
            {
              path: "/",
              element: <Pos />,
            },

            {
              path: "dashboard",
              element: <AdminLayout />,
              children: [
                {
                  index: true,
                  element: <Dashboard />,
                },
                {
                  path: "products",
                  element: <Products />,
                },
                {
                  path: "categories",
                  element: <Categories />,
                },
                {
                  path: "unitOfMeasure",
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
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div id={theme}>
          <ToastContainer />
          <RouterProvider router={routers}></RouterProvider>
        </div>
      </ThemeContext.Provider>
    </>
  );
}
