import { createSlice } from "@reduxjs/toolkit";

const initialState = { item: null };

export const editItemSlice = createSlice({
  name: "editItem",
  initialState,
  reducers: {
    setEditItem: (state, action) => {
      state.item = action.payload;
    },
  },
});

export const { setEditItem } = editItemSlice.actions;

export default editItemSlice.reducer;
