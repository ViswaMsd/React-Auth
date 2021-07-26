import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  isLogined: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
};
const authSlice = createSlice({
  name: "auth",
  initialState: initialAuthState,
  reducers: {
    setToken: () => {},
    loginHandler: () => {},
    logoutHandler: () => {},
  },
});

const store = configureStore({ reducer: authSlice.reducer });

export const authActions = authSlice.actions;
export default store;
