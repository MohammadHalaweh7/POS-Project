import { Input } from "@mui/material";
import {  useContext } from "react";
import { searchControlContext } from "./../../../../App.js";

export default function SearchControl() {
  const { searchToken, setSearchToken } = useContext(searchControlContext);
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchToken(e.target.value);
  };
  return (
    <Input
      placeholder="Search Product"
      type="text"
      value={searchToken}
      onChange={onChangeSearch}
      variant="outlined"
      size="small"
      style={{ width: "300px", height: "40px" }}
    />
  );
}
