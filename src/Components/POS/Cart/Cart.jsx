import React from "react";
import CartProducts from "./CartProducts";
import CartForm from "./CartForm";
import CartSelection from "./CartSelection";
import CartAddition from "./CartAddition";

export default function Cart() {
  return (
    <>
    <CartSelection />
    <CartAddition />
      <CartProducts />
      <CartForm />
    </>
  );
}
