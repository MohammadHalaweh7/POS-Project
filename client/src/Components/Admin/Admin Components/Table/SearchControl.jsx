import { Input } from "@mui/material";
import {  useContext } from "react";
import { searchControlContext } from "./../../../../App.js";
import style from './Table.module.css'
export default function SearchControl({title}) {
  const { searchToken, setSearchToken } = useContext(searchControlContext);
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearchToken(e.target.value);
  };
  return (
    <Input
      placeholder={title}
      type="text"
      value={searchToken}
      onChange={onChangeSearch}
      variant="outlined"
      size="small"
      className={`${style.SearchControl}`}
    />
  );
}
