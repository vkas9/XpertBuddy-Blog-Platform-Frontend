import { configureStore } from "@reduxjs/toolkit";
import credentialSlice from "./credentials";
import blogSlice from "./blogStore";

const Store = configureStore({
  reducer: {
    credential: credentialSlice.reducer,
    blogStore: blogSlice.reducer,
  },
});

export default Store;
