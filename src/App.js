import "./App.css";
import React, { useState, useEffect } from "react";
import Layout from "./Components/Layout/Layout";
import NotFound from "./Components/NotFound/NotFound";
import Pos from "./Components/POS/Pos/Pos";
import Login from "./Components/Registration/Login/Login";
import Signup from "./Components/Registration/Signup/Signup";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import jwt from "jwt-decode";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import Products from "./Components/Admin/Admin Components/Products/Products";
import Categories from "./Components/Admin/Admin Components/Categories/Categories";
import UnitOfMeasure from "./Components/Admin/Admin Components/UnitOfMeasure/UnitOfMeasure";
import Dashboard from "./Components/Admin/Admin Components/Dashboard/Dashboard.jsx";
import AdminLayout from "./Components/Admin/AdminLayout";

function App() {
  const [user, setUser] = useState(null);

  function saveCurrentUser() {
    const token = localStorage.getItem("user");
    const localStorageUser = JSON.parse(token)
    console.log(localStorageUser);
    setUser(localStorageUser);
    console.log(localStorageUser);
  }
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      saveCurrentUser();
    }
  }, []);
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
            { path: "products", element: <Products /> },
            { path: "categories", element: <Categories /> },
            { path: "unitOfMeasure", element: <UnitOfMeasure /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
