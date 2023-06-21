import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
} from "recharts";

const data01 = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 2800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function BarCharts() {
  const renderCustomBarLabel = (props) => {
    const { x, y, width, value } = props;
    const percentage = `${(
      (value / data01.reduce((sum, entry) => sum + entry.pv, 0)) *
      100
    ).toFixed(2)}%`;

    return (
      <text x={x + width / 2} y={y} fill="#666" textAnchor="middle" dy={-6}>
        {percentage}
      </text>
    );
  };

  return (
    <>
      <div>
        <h6 className="pb-4">Price of Categories : </h6>
        <ResponsiveContainer width={600} height={400}>
          <RechartsBarChart
            width={500}
            height={300}
            data={data01}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
            barSize={20}
          >
            <XAxis
              dataKey="name"
              scale="point"
              padding={{ left: 10, right: 10 }}
            />
            <YAxis />
            <Tooltip />
            <Legend />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar
              dataKey="pv"
              fill="#8884d8"
              background={{ fill: "#eee" }}
              label={renderCustomBarLabel}
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}