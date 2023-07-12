import {
  PieChart as RechartsPieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Cell } from "recharts";
import { useRouteLoaderData } from "react-router-dom";

export default function PieChart() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const productsData = data[1].value.data;

  const totalProducts = productsData.length;

  const chartData = categoriesData.map((category) => {
    const numberOfProductsInCategory = productsData.filter(
      (product) => product.categoryId === category.categoryId
    ).length;

    // const percentage = (
    //   (numberOfProductsInCategory / totalProducts) *
    //   100
    // ).toFixed(2);

    return {
      name: category.categoryName,
      value: +numberOfProductsInCategory,
      color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
    };
  });

  // const renderTooltipContent = ({ payload }) => {
  //   if (payload && payload.length > 0) {
  //     const { name, value } = payload[0].payload;
  //     return (
  //       <div>
  //         <p>{`${name}: ${value}%`}</p>
  //       </div>
  //     );
  //   }
  //   return null;
  // };

  return (
    <>
      <div>
        <h6 className="pb-4">Percentage of Categories:</h6>
        <ResponsiveContainer width={340} height={400}>
          <RechartsPieChart>
            <Pie
              data={chartData}
              dataKey="value"
              isAnimationActive={false}
              cx={170}
              cy={200}
              outerRadius={130}
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            {/* <Tooltip content={renderTooltipContent} /> */}
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
