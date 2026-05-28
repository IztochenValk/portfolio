import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import mitreReducer from "./reducers/mitreReducer";
import progressReducer from "./reducers/progressReducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    mitre: mitreReducer,
    progress: progressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
