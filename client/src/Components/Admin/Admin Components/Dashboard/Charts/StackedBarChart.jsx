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
import SelectCategory from "./SelectCategory";
import { useLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StackedBarChart() {
  const data = useLoaderData();
  const categoryProducts = useSelector((state) => state.category.categoryProducts);
  const activeCategory = useSelector((state) => state.category.activeProduts);

  // const filteredProductByCategory =
  //   categoryInfo && data[1]?.data
  //     ? data[1].data.filter(
  //         (product) => product.categoryId === categoryInfo.categoryId
  //       )
  //     : data[1]?.data;

  const chartData = data[1].data?.map((product) => ({
    name: product.name,
    price: product.price,
    quantity: product.quantity,
    code: product.code,
  }));

  const yDomain = [0, 300];

  return (
    <div className="container mb-5">
      <div className="flexBox mb-3">
        <h6 className="pb-4">Product Information :</h6>
        <SelectCategory />
      </div>
      <ResponsiveContainer width="100%" height={300} className={"container"}>
        <RechartsBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={yDomain} />
          <Tooltip />
          <Legend />
          <Bar dataKey="price" fill="#8884d8" />
          <Bar dataKey="quantity" fill="#ffc658" />
          <Bar dataKey="code" fill="#82ca9d" />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
