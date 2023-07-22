import React from "react";
import CartProducts from "./CartProducts";
import CartForm from "./CartForm";
import CartAddition from "./CartAddition";
import style from "./Cart.module.css";
export default function Cart() {
  return (
    <>
      <div className={`${style.cart}`}>
        <h4 className="textMode">Order Details</h4>
        <hr />
        <CartAddition />
        <CartProducts />
        <CartForm />
      </div>
    </>
  );
}
