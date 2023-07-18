import { useRef, useState } from "react";
import style from "./Cart.module.css";
import { Button } from "@mui/material";

import { clearCartItems } from "../../../redux/features/CartItems/cartItemsSlice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";

export default function CartForm() {
  const dispatch = useDispatch();
  const [taxValue, setTaxValue] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  // const [subTotal, setSubTotal] = useState(0);
  const cartItems = useSelector((state) => state.cartItems.carts);
  const activeCart = useSelector((state) => state.cartItems.activeCart);
  const activeCartItems = cartItems.filter(
    (cart) => cart.name === activeCart
  )[0].items;

  const cartSubTotalRef = useRef();

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
    // !taxValue ? (taxValue = 0) : taxValue;
    // !discountValue ? (discountValue = 0) : discountValue;
    const totalPrice = subTotal + taxAmount - discountedPrice;
    return Math.floor(totalPrice);
  };

  const handleCancle = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Cancel the order!",
    }).then((result) => {
      if (!result.isConfirmed) return;
      Swal.fire("Canceled!", "Your order has been Canceled.", "success");
      dispatch(clearCartItems());
      setTaxValue(0);
      setDiscountValue(0);
    });
  };

  const handleCheckout = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:5050/checkout",
        {
          products: [...activeCartItems],
          tax: +taxValue / 100,
          discount: +discountValue / 100,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("accessToken")
            )}`,
          },
        }
      );
      Swal.fire(`${activeCart} Toatal Price = ${data.totalPrice} `);
      console.log("Checkout success:", data);
      dispatch(clearCartItems());
      setTaxValue(0);
      setDiscountValue(0);
    } catch (error) {
      console.log("Checkout error:", error);
    }
  };

  return (
    <table className={`${style.CartTable}`}>
      <thead>
        <tr>
          <td>SubTotal</td>
          <td>{calculateSubtotal()} $</td>
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
          <td style={{ color: "orange" }}>{calculateTotal()} $</td>
        </tr>

        <tr>
          <td>
            <Button fullWidth variant="outlined" onClick={handleCancle}>
              Cancel
            </Button>
          </td>
          <td>
            <Button fullWidth variant="contained" onClick={handleCheckout}>
              Checkout
            </Button>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
