import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/userSlice";
import productReducer from "@/redux/features/productSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
