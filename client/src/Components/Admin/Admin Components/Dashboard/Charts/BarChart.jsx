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
import { useRouteLoaderData } from "react-router-dom";

export default function BarCharts() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const productsData = data[1].value.data;

  const chartData = categoriesData.map((category) => {
    const numberOfProductsInCategory = productsData.filter(
      (product) => product.categoryId === category.categoryId
    ).length;

    return {
      name: category.categoryName,
      pv: +numberOfProductsInCategory,
    };
  });
  const renderCustomBarLabel = (props) => {
    const { x, y, width, value } = props;
    const percentage = `${(
      (value / chartData.reduce((sum, entry) => sum + entry.pv, 0)) *
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
        <h6 className="pb-4">Percentage of each category : </h6>
        <ResponsiveContainer width={700} height={400}>
          <RechartsBarChart
            width={500}
            height={300}
            data={chartData}
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
