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
import { useRouteLoaderData } from "react-router-dom";
import { useSelector } from "react-redux";

export default function StackedBarChart() {
  const data = useRouteLoaderData("allDataRoute");
  const productsData = data[1].value.data;

  const activeCategory = useSelector((state) => state.category.activeCategory);

  const filteredProductByCategory = activeCategory
    ? productsData?.filter(
        (product) => product.categoryId === activeCategory.categoryId
      )
    : productsData;

  const chartData = filteredProductByCategory?.map((product) => ({
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
