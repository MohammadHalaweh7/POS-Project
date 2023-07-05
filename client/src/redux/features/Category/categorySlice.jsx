import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const categorySlice = createSlice({
  name: 'category', 
  initialState,
  reducers: {
    setCategoryInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCategoryInfo } = categorySlice.actions;

export default categorySlice.reducer;
