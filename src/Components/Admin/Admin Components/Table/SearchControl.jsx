import { Input } from "@mui/material";
import {  useContext } from "react";
import { searchControlContext } from "./../../../../App.js";
import style from './Table.module.css'
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
      className={`${style.SearchControl}`}
    />
  );
}
