import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import addCategoryReducer from "../slices/addCategorySlice";
import { useDispatch } from "react-redux";

// Create the store with both reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    addCategory: addCategoryReducer,
  },
});

// TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;