import { Input } from "@mui/material";
import style from "./Table.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchValue } from "../../../../redux/features/Search/searchSlice.js";

export default function SearchControl({ title }) {
  const dispatch = useDispatch();
  const searchToken = useSelector((state) => state.search.value);
  const onChangeSearch = (e) => {
    e.preventDefault();
    dispatch(setSearchValue(e.target.value));
  };
  return (
    <Input
      placeholder={title}
      type="text"
      value={searchToken.value}
      onChange={onChangeSearch}
      variant="outlined"
      size="small"
      className={`${style.SearchControl}`}
    />
  );
}
