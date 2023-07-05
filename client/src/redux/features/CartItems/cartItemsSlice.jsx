import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = [...state.cartItems, action.payload];
    },
    deleteCartItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },
    clearCartItems: (state) => {
      state.cartItems = [];
    },
  },
});

export const { setCartItems, deleteCartItem, clearCartItems } =
  cartItemsSlice.actions;

export default cartItemsSlice.reducer;
