import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import addCategoryReducer from "../slices/addCategorySlice";
import { useDispatch } from "react-redux";

// Create Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    addCategory: addCategoryReducer,
  },
});

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;