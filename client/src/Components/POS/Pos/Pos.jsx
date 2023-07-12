import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import SubCategories from "../SubCategories/SubCategories";
import style from "./../Pos.module.css";
import Cart from "../Cart/Cart";
import { useRouteLoaderData } from "react-router-dom";

export default function Pos() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;
  const productsData = data[1].value.data;

  return (
    <>
      <div className={`flexBox ${style.pos}`}>
        <div className={`flex-column ${style.posContent}`}>
          <CategoriesSlider
            productsData={productsData}
            categoriesData={categoriesData}
          />
          <SubCategories productsData={productsData} />
        </div>
        <div className={`${style.cartSide}`}>
          <Cart />
        </div>
      </div>
    </>
  );
}
