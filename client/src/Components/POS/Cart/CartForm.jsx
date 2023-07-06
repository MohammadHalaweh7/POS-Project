import React, {useState } from "react";
import style from "./Cart.module.css";
import { Button } from "@mui/material";

import { clearCartItems } from "../../../redux/features/CartItems/cartItemsSlice";
import { useDispatch, useSelector } from "react-redux";

export default function CartForm() {
  const dispatch = useDispatch();
  const [taxValue, setTaxValue] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const cartItems = useSelector((state) => state.cartItems.carts);
  const activeCart = useSelector((state) => state.cartItems.activeCart);
  const activeCartItems = cartItems.filter(
    (cart) => cart.name === activeCart
  )[0].items;


  const calculateSubtotal = () => {
    let subTotal = 0;
    activeCartItems?.forEach((ele) => {
      const { quantity, price } = ele;
      if (quantity && price) {
        subTotal += price * quantity;
      }
    });
    return subTotal;
  };

  const handleTax = (e) => {
    const value = parseInt(e.target.value);
    setTaxValue(value);
  };
  const handleDiscount = (e) => {
    const value = parseInt(e.target.value);
    setDiscountValue(value);
  };

  const subTotal = calculateSubtotal();
  const taxAmount = subTotal * (taxValue / 100);
  const discountedPrice = subTotal * (discountValue / 100);

  const calculateTotal = () => {
    const totalPrice = subTotal + taxAmount - discountedPrice;
    return Math.floor(totalPrice);
  };

  return (
    <table className={`${style.CartTable}`}>
      <thead>
        <tr>
          <td>SubTotal</td>
          <td>{calculateSubtotal()}$</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Tax (%)</td>
          <td>
            <input
              min={0}
              max={100}
              type="number"
              value={taxValue}
              onChange={(e) => handleTax(e)}
            ></input>
          </td>
        </tr>

        <tr>
          <td>Discount (%)</td>
          <td>
            <input
              min={0}
              max={100}
              type="number"
              value={discountValue}
              onChange={(e) => handleDiscount(e)}
            ></input>
          </td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td>Total</td>
          <td>{calculateTotal()}</td>
        </tr>

        <tr>
          <td>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => dispatch(clearCartItems())}
            >
              Cancel
            </Button>
          </td>
          <td>
            <Button fullWidth variant="contained">
              Checkout
            </Button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
