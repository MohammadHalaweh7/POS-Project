import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useRouteLoaderData } from "react-router-dom";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { setActiveCategory } from "../../../../../redux/features/Category/categorySlice";

export default function BasicSelect() {
  const data = useRouteLoaderData("allDataRoute");
  const categoriesData = data[0].value.data;

  const [categorySelect, setCategorySelect] = useState("");
  const dispath = useDispatch();

  const handleChange = (e) => {
    const value = e.target.value;
    setCategorySelect(value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categorySelect}
          label="Age"
          onChange={handleChange}
        >
          {categoriesData.map((category, index) => {
            return (
              <MenuItem
                key={index}
                value={category.categoryName}
                onClick={() => dispath(setActiveCategory(category))}
              >
                {category.categoryName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
