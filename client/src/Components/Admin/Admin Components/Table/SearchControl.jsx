import { Input } from "@mui/material";
import style from "./Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../../redux/features/Search/searchSlice.js";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "App";
import { useDebounce } from "../../../hooks/useDebounce";

export default function SearchControl({ title }) {
  const dispatch = useDispatch();
  const searchToken = useSelector((state) => state.search.value);
  const [value, setValue] = useState("");
  const { theme } = useContext(ThemeContext);

  const onChangeSearch = (e) => {
    e.preventDefault();
    setValue(e.target.value);
  };
  const debouncedValue = useDebounce(value, 1000);

  useEffect(() => {
    dispatch(setSearchValue(value));
  }, [debouncedValue]);

  return (
    <Input
      placeholder={title}
      type="text"
      value={searchToken.value}
      onChange={onChangeSearch}
      variant="outlined"
      size="small"
      className={`${style.SearchControl}`}
      inputProps={{
        style: { color: theme === "dark" ? "white" : "black" },
      }}
    />
  );
}
