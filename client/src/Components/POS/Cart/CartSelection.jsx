import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import {
  setActiveCart,
} from "../../../redux/features/CartItems/cartItemsSlice";
import { ThemeContext } from "App";

export default function BasicSelect() {
  const { theme } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartItems.carts);
  const activeCart = useSelector((state) => state.cartItems.activeCart);

  const handleChange = (e) => {
    dispatch(setActiveCart(e.target.value));
  };

  return (
    <Box sx={{ minWidth: 150 }}>
      <FormControl>
        <InputLabel id="demo-simple-select-label" className="textMode">
          Carts
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeCart}
          fullWidth
          onChange={handleChange}
        >
          {carts.map((cart, index) => {
            return (
              <MenuItem
                key={index}
                value={cart.name}
                sx={{ minWidth: 150 }}
                className="textMode"
              >
                {cart.name}{" "}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
