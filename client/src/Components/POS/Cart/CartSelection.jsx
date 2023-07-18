import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveCart,
  deleteCart,
} from "../../../redux/features/CartItems/cartItemsSlice";

export default function BasicSelect() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartItems.carts);
  const activeCart = useSelector((state) => state.cartItems.activeCart);

  const handleChange = (e) => {
    dispatch(setActiveCart(e.target.value));
  };

  const handleDeleteCart = (cartName) => {
    dispatch(deleteCart(cartName));
  };
  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Carts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeCart}
          label="Age"
          fullWidth
          onChange={handleChange}
        >
          {carts.map((cart, index) => {
            return (
              <MenuItem key={index} value={cart.name} sx={{ minWidth: 150 }}>
                {cart.name}{" "}
                {cart.name !== activeCart && (
                  <i
                    className="fas fa-times"
                    style={{
                      color: "gray",
                      fontSize: "15px",
                      cursor: "pointer",
                      marginLeft: "auto",
                    }}
                    onClick={() => handleDeleteCart(cart.name)}
                  ></i>
                )}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
