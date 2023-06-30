import React from "react";
import style from "./Cart.module.css";
import { Button } from "@mui/material";
export default function CartForm() {
  return (
    <table className={`${style.CartTable}`}>
      <tr>
        <td>SubTotal</td>
        <td>500$</td>
      </tr>

      <tr>
        <td>Tax (10%)</td>
        <td>
          <input min={0} max={100} type="number"></input>
        </td>
      </tr>

      <tr>
        <td>Discount (20%)</td>
        <td>
          <input min={0} max={100} type="number"></input>
        </td>
      </tr>

      <tr>
        <td>Total</td>
        <td>200$</td>
      </tr>

      <tr>
        <td>
          <Button fullWidth variant="outlined">
            Cancel
          </Button>
        </td>
        <td>
          <Button fullWidth variant="contained">
            Checkout
          </Button>
        </td>
      </tr>
    </table>
  );
}
