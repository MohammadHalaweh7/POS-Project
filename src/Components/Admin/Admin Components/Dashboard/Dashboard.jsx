import React from "react";
import Navbar from "../Navbar/Navbar";
import Cards from "./Cards/Cards";
import Charts from "./Charts/Charts";

export default function Dashboard() {
  return (
    <>
      <Navbar title="Dashboard" width="container"/>
      <Cards />
      <Charts />
    </>
  );
}
