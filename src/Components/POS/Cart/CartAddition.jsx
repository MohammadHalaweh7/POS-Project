import React from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
export default function CartAddition() {
  return (
    <>
      <div className="flexBox m-3">
        <div>
        <TextField id="standard-basic" label="Cart Name" variant="standard" sx={{ width: '400px' }} />

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
