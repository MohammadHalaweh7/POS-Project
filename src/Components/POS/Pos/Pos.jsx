import React from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Pos({ setUser }) {
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("userToken");
    setUser(null);
    navigate(`/#`);
  }

  return (
    <div>
      <h1>Pos Page</h1>
      <p onClick={()=>logout()}>Logout</p>
    </div>
  );
}
