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

export const searchControlContext = createContext();
export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [searchToken, setSearchToken] = useState("");
  function saveCurrentUser() {
    const token = localStorage.getItem("user");
    const localStorageUser = JSON.parse(token);
    console.log("***********************")
    console.log(localStorageUser);
    setUser(localStorageUser);
    console.log(localStorageUser);
    console.log("***********************")
  }
  useEffect(() => {
    if (localStorage.getItem("user")) {
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

  return (
    <>
    <UserContext.Provider value={{user}}>
    <searchControlContext.Provider value={{ searchToken, setSearchToken }}>
        <RouterProvider router={routers}></RouterProvider>
      </searchControlContext.Provider>
    </UserContext.Provider>

    </>
  );
}

export default App;
