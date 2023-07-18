import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  carts: [
    {
      name: "Default Cart",
      items: [],
    },
  ],

  activeCart: "Default Cart",
};

export const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addNewCart: (state, action) => {
      const existed = state.carts.find(
        (ele) => ele.name === action.payload.name
      );
      if (existed) {
        Swal.fire("This cart already exists! choose another name");
      } else state.carts = [...state.carts, action.payload];
    },
    deleteCart:(state, action)=>{
      const filteredCart = state.carts.filter((cart)=>cart.name !== action.payload)
      state.carts = filteredCart
    },
    setActiveCart: (state, action) => {
      state.activeCart = action.payload;
    },

    addCartItems: (state, action) => {
      state.carts = state.carts.map((cart) => {
        if (state.activeCart === cart.name) {
          const existed = cart.items.find(
            (product) => product.id === action.payload.id
          );
          if (existed) {
            cart.items.forEach((product) => {
              if (product.id === action.payload.id) {
                product.quantity += 1;
              }
            });
          } else {
            cart.items = [...cart.items, action.payload];
          }
        }
        return cart;
      });
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.carts = state.carts.map((cart) => {
        if (state.activeCart === cart.name) {
          cart.items.forEach((product) => {
            if (product.id === id) {
              product.quantity = quantity;
            }
          });
        }
        return cart;
      });
    },
    deleteCartItem: (state, action) => {
      state.carts.forEach((cart) => {
        cart.items = cart.items.filter((item) => item.id !== action.payload);
      });
    },
    clearCartItems: (state) => {
      state.carts.forEach((cart) => {
        if (cart.name === state.activeCart) cart.items = [];
      });
    },
  },
});

export const {
  addCartItems,
  deleteCartItem,
  clearCartItems,
  addNewCart,
  setActiveCart,
  updateQuantity,
  deleteCart
} = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
