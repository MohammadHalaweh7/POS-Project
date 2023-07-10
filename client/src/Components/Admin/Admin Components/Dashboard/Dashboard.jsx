import React from "react";
import Navbar from "../Navbar/Navbar";
import Cards from "./Cards/Cards";
import Charts from "./Charts/Charts";

export default function Dashboard() {
  return (
    <>
      <div className="m-5 pt-4">
        <Cards />
        <Charts />
      </div>
    </>
  );
}
