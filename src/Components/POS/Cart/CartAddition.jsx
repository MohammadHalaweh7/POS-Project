import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import CartSelection from "./CartSelection";
export default function CartAddition() {
  return (
    <>
      <div className="flexBox">
        <CartSelection />
        <div>
          <TextField
            id="standard-basic"
            label="Cart Name"
            variant="standard"
            sx={{ width: "250px" }}
          />
        </div>
        <div>
          <Button fullWidth variant="contained">
            Add cart
          </Button>
        </div>
      </div>
    </>
  );
}
