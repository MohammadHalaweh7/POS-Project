import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRouter({ children }) {
  if (localStorage.getItem("user")) {
    return <>{children}</>;
  } else {
    return <Navigate to="/#"></Navigate>;
  }
}
