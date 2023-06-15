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
function App() {
  const [user, setUser] = useState(null);

  function saveCurrentUser() {
    const token = localStorage.getItem("userToken");
    const decoded = jwt(token);
    console.log(decoded);
    setUser(decoded);
    console.log(user);
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
        {
          path: "pos",
          element: (
            <ProtectedRouter>
              <Pos user={user} setUser={setUser} />
            </ProtectedRouter>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  return <RouterProvider router={routers}></RouterProvider>;
}

export default App;
