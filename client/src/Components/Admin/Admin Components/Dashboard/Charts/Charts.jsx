import React from "react";
import PieChart from "./PieChart";
import BarCharts from "./BarChart";
import StackedBarChart from "./StackedBarChart";
export default function Charts() {
  return (
    <>
      <div className="container d-flex align-item-center justify-content-between flex-wrap mt-5 mb-5 textMode">
        <PieChart />
        <BarCharts />
      </div>
      <StackedBarChart />
    </>
  );
}
