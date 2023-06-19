import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "Product A",
    price: 100,
    cost: 21,
    quantity: 200,
  },
  {
    name: "Product B",
    price: 120,
    cost: 21,
    quantity: 150,
  },
  {
    name: "Product C",
    price: 51,
    cost: 53,
    quantity: 141,
  },
  {
    name: "Product D",
    price: 80,
    cost: 47,
    quantity: 122,
  },
  {
    name: "Product E",
    price: 80,
    cost: 70,
    quantity: 54,
  },
  {
    name: "Product F",
    price: 100,
    cost: 14,
    quantity: 10,
  },
  {
    name: "Product G",
    price: 80,
    cost: 70,
    quantity: 180,
  },
];

export default function StackedBarChart() {
  return (
<div className="container mb-5">
<h6 className="pb-4">Product Information : </h6>
    <ResponsiveContainer width="100%" height={300} className={"container"}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="price" fill="#8884d8" />
        <Bar dataKey="cost" fill="#82ca9d" />
        <Bar dataKey="quantity" fill="#ffc658" />
      </RechartsBarChart>
    </ResponsiveContainer>
</div>
  );
}