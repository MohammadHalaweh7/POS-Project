import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: null, accessToken: null };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { email, accessToken } = action.payload;
      state.accessToken = accessToken;
      state.email = email;
    },

    logout: (state) => {
      state = { email: null, accessToken: null };
      localStorage.clear();
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
