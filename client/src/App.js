import "./App.css";
import React, { useState, useEffect, createContext } from "react";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Pos from "./Components/POS/Pos/Pos";
import Login from "./Components/Registration/Login/Login";
import Signup from "./Components/Registration/Signup/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import Products from "./Components/Admin/Admin Components/Products/Products";
import Categories from "./Components/Admin/Admin Components/Categories/Categories";
import UnitOfMeasure from "./Components/Admin/Admin Components/UnitOfMeasure/UnitOfMeasure";
import Dashboard from "./Components/Admin/Admin Components/Dashboard/Dashboard.jsx";
import AdminLayout from "./Components/Admin/AdminLayout";
import axios from "axios";

export const searchControlContext = createContext();
export const UserContext = createContext();

export default function App() {
  const [user, setUser] = useState(null);
  const [searchToken, setSearchToken] = useState("");

  function saveCurrentUser() {
    const token = localStorage.getItem("user");
    const localStorageUser = JSON.parse(token);
    setUser(localStorageUser);
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      saveCurrentUser();
    }
  }, []);

  const categoriesLoader = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5050/product-categories"
      );
      console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const categoryProductLoader = async () => {
    try {
      const response = await Promise.all([
        axios.get("http://localhost:5050/product-categories"),
        axios.get("http://localhost:5050/products"),
      ]);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")
      console.log(response)
      return response;

    } catch (error) {
      return error;
    }
  };

  const productsLoader = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/products");
      console.log(data);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx")

      return data;
    } catch (error) {
      console.log("error", error);
      return error;
    }
  };

  const unitLoader = async () => {
    try {
      const { data } = await axios.get("http://localhost:5050/unit-of-measure");
      console.log(data);
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
        { index: true, element: <Login saveCurrentUser={saveCurrentUser} /> },
        { path: "signup", element: <Signup /> },
        { path: "*", element: <NotFound /> },
        {
          path: "pos",
          loader: categoryProductLoader,
          element: (
            <ProtectedRouter>
              <Pos user={user} setUser={setUser} />
            </ProtectedRouter>
          ),
        },
        {
          path: "dashboard",
          element: <AdminLayout />,
          children: [
            { path: "", element: <Dashboard /> },
            { path: "products", loader: productsLoader, element: <Products /> },
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
  ]);

  return (
    <>
      <UserContext.Provider value={{ user }}>
        <searchControlContext.Provider value={{ searchToken, setSearchToken }}>
          <RouterProvider router={routers}></RouterProvider>
        </searchControlContext.Provider>
      </UserContext.Provider>
    </>
  );
}
