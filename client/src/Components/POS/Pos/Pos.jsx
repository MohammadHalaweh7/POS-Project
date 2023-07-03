import Navbar from "Components/Admin/Admin Components/Navbar/Navbar";
import React, { createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import SearchControl from "Components/Admin/Admin Components/Table/SearchControl";
import SubCategories from "../SubCategories/SubCategories";
import style from "./../Pos.module.css";
import Cart from "../Cart/Cart";

import { useLoaderData } from "react-router-dom";

export const CategoryIdContext = createContext();
export const CartItemsContext = createContext();

export default function Pos() {
  const [categoryId, setCategoryId] = useState();
  const [cartItems, setCartItems] = useState([]);
  const data = useLoaderData();
  console.log(data);
  return (
    <>
      <Navbar title="POS" width="wideContainer" />
      <CartItemsContext.Provider value={{ cartItems, setCartItems }}>
        <CategoryIdContext.Provider
          value={{ categoryId, setCategoryId }}
        >
          <div className={`flexBox ${style.pos}`}>
            <div className={`flex-column ${style.posContent}`}>
              <CategoriesSlider categoriesData={data[0].data} />
              <SubCategories productsData={data[1].data} />
            </div>
            <div className={`${style.cartSide}`}>
              <Cart />
            </div>
          </div>
        </CategoryIdContext.Provider>
      </CartItemsContext.Provider>
    </>
  );
}
