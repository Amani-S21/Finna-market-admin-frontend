import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/userSlice";
import featureReducer from "@/redux/features/featureSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feature: featureReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
