import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import addCategoryReducer from "../slices/category/addCategorySlice";
import categoryListReducer from "../slices/category/categoryListSlice";
import categoryUpdateReducer from "../slices/category/updateCategorySlice";
import { useDispatch } from "react-redux";

// Create Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    addCategory: addCategoryReducer,
    categoryList:categoryListReducer,
    categoryUpdate:categoryUpdateReducer
  },
});

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;