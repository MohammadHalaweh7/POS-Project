import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useSelector, useDispatch } from "react-redux";
import { setActiveCart } from "../../../redux/features/CartItems/cartItemsSlice";

export default function BasicSelect() {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.cartItems.carts);
  const activeCart = useSelector((state) => state.cartItems.activeCart);

  const handleChange = (e) => {
    dispatch(setActiveCart(e.target.value));
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Carts</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={activeCart}
          label="Age"
          onChange={handleChange}
        >
          {carts.map((cart, index) => {
            return (
              <MenuItem key={index} value={cart.name}>
                {cart.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
