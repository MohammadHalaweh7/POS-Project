import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import searchSlice from "./features/Search/searchSlice";
import categorySlice from "./features/Category/categorySlice";
import cartItemsSlice from "./features/CartItems/cartItemsSlice";
import userSlice from "./features/User/userSlice";

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
const persistUserConfig = {
  key: "user-persist",
  storage,
};
const persistedUserReducer = persistReducer(persistUserConfig, userSlice);

export const store = configureStore({
  reducer: {
    search: searchSlice,
    category: persistedCategoryReducer,
    cartItems: persistedCartItemsReducer,
    user: persistedUserReducer,
  },
  middleware: () => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
