import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import SubCategories from "../SubCategories/SubCategories";
import style from "./../Pos.module.css";
import Cart from "../Cart/Cart";
import { useLoaderData } from "react-router-dom";

export default function Pos() {
  const data = useLoaderData();

  return (
    <>
      <div className={`flexBox ${style.pos}`}>
        <div className={`flex-column ${style.posContent}`}>
          <CategoriesSlider productsData={data[1].data}  categoriesData={data[0].data} />
          <SubCategories productsData={data[1].data} />
        </div>
        <div className={`${style.cartSide}`}>
          <Cart />
        </div>
      </div>
    </>
  );
}
