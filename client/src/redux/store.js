import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import counterSlice from "./features/counter/counterSlice";
import categorySlice from "./features/Category/categorySlice.jsx";
import cartItemsSlice from "./features/CartItems/cartItemsSlice"

// for counter slice
const persistCounterConfig = {
  key: "counter-persist",
  storage,
};
const persistedCounterReducer = persistReducer(
  persistCounterConfig,
  counterSlice
);
// ---------------------------------------------------------------------------
const persistCategoryConfig = {
  key: "category-persist",
  storage,
};
const persistedCategoryReducer = persistReducer(
  persistCategoryConfig,
  categorySlice
);
// ---------------------------------------------------------------------------
const persistCartItemsConfig = {
  key: "cartItems-persist",
  storage,
};
const persistedCartItemsReducer = persistReducer(
  persistCartItemsConfig,
  cartItemsSlice
);
// ---------------------------------------------------------------------------

export const store = configureStore({
  reducer: {
    counter: persistedCounterReducer,
    category: persistedCategoryReducer,
    cartItems:persistedCartItemsReducer
  },
  middleware: () => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
