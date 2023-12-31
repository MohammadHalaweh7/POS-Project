import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import SubCategories from "../SubCategories/SubCategories";
import style from "./../Pos.module.css";
import Cart from "../Cart/Cart";

export default function Pos() {
  return (
    <>
      <div className={`flexBox ${style.pos} mode`}>
        <div className={`flex-column ${style.posContent}`}>
          <CategoriesSlider />
          <SubCategories />
        </div>
        <div className={`${style.cartSide} cartMode`}>
          <Cart />
        </div>
      </div>
    </>
  );
}
