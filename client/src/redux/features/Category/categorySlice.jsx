import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  categoryProducts: [],
  activeCategory: null,
};

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setCategoryProducts: (state, action) => {
      state.categoryProducts = action.payload;
    },
  },
});

export const { setActiveCategory, setCategoryProducts } = categorySlice.actions;

export default categorySlice.reducer;
