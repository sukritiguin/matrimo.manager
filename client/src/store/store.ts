import { configureStore } from "@reduxjs/toolkit";
import canvasReducer from "@/features/events/store/canvasSlice";

const store = configureStore({
  reducer: {
    canvas: canvasReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
