import React from "react";
import Navbar from "../Navbar/Navbar";
import Cards from "./Cards/Cards";
import Charts from "./Charts/Charts";
import { useLoaderData } from "react-router-dom";

export default function Dashboard() {
  const date = useLoaderData();
  console.log("first")
  return (
    <>
      <div className="m-5 pt-4">
        <Cards />
        <Charts />
      </div>
    </>
  );
}
