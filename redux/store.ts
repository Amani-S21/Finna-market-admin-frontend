import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/redux/features/userSlice";
import featureReducer from "@/redux/features/featureSlice";
import categoryReducer from "@/redux/features/categorySlice";
import agencyReducer from "@/redux/features/agencySlice";
import scheduleReducer from "@/redux/features/scheduleSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    feature: featureReducer,
    category: categoryReducer,
    agency: agencyReducer,
    schedule: scheduleReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
