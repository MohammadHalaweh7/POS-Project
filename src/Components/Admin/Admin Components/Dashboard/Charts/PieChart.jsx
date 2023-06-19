import React from "react";
import {
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Cell } from "recharts";
const data01 = [
  { name: "Group A", value: 400, color: "#dc3545" },
  { name: "Group B", value: 300, color: "#57b960" },
  { name: "Group C", value: 300, color: "#0000FF" },
  { name: "Group D", value: 100, color: "#FFFF00" },
  { name: "Group E", value: 200, color: "#FF00FF" },
  { name: "Group F", value: 200, color: "#17a2b8" },
  { name: "Group G", value: 100, color: "#FFA500" },
];

export default function PieChart() {
  return (
    <>
      <div>
        <h6 className="pb-4">Percentage of Categories : </h6>
        <ResponsiveContainer width={400} height={400}>
          <RechartsPieChart>
            <Pie
              data={data01}
              dataKey="value"
              isAnimationActive={false}
              cx={200}
              cy={200}
              outerRadius={140}
              label
            >
              {data01.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
