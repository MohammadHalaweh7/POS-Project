import React from "react";
import CartProducts from "./CartProducts";
import CartForm from "./CartForm";
import CartSelection from "./CartSelection";
import CartAddition from "./CartAddition";

export default function Cart() {
  return (
    <>
    <h4 className="textMode">Order Details</h4>
    <hr />
      <CartAddition />
      <CartProducts />
      <CartForm />
    </>
  );
}
