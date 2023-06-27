import Navbar from "Components/Admin/Admin Components/Navbar/Navbar";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";
import SubCategories from "../SubCategories/SubCategories";
import style from "./../Pos.module.css";
import Cart from "../Cart/Cart";
export default function Pos() {
  return (
    <>
      <Navbar title="POS" width="wideContainer" />
      <div className={`flexBox ${style.pos}`}>
        <div className={`flex-column ${style.posContent}`}>
          <CategoriesSlider />
          <SubCategories />
        </div>
        <div className={`${style.cartSide}`}>
          <Cart />
        </div>
      </div>
    </>
  );
}
