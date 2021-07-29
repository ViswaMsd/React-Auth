import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  //   isLogined: localStorage.getItem("token") ? true : false,
  isLogined: false,
  token: localStorage.getItem("token"),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    loginHandler: (state) => {
      state.isLogined = true;
    },
    logoutHandler: (state) => {
      state.isLogined = false;
      state.token = null;
    },
  },
});

const store = configureStore({ reducer: authSlice.reducer });

export const authActions = authSlice.actions;
export default store;
