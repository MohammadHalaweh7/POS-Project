import React, { useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CartSelection from "./CartSelection";
import { useDispatch } from "react-redux";
import {
  addNewCart,
  setActiveCart,
} from "redux/features/CartItems/cartItemsSlice";

export default function CartAddition() {
  const dispatch = useDispatch();
  const [newCart, setNewCart] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setNewCart(value);
  };

  const handleAddNewCart = () => {
    dispatch(addNewCart({ name: newCart, items: [] }));
    dispatch(setActiveCart(newCart));
    setNewCart("");
  };
  return (
    <>
      <div className="flexBox">
        <CartSelection />
        <div>
          <TextField
            id="standard-basic"
            name="cartName"
            label="Cart Name"
            variant="standard"
            sx={{ width: "250px" }}
            value={newCart}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={handleAddNewCart}
          >
            Add cart
          </Button>
        </div>
      </div>
    </>
  );
}
