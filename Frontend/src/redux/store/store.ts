import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice"; // Reducer for authentication
import addCategoryReducer from "../slices/category/addCategorySlice"; // Reducer for category management
import addProductReducer from "../slices/addProductSlice";
import catergoryListReducer from "../slices/category/categoryListSlice" // Reducer for product management
import { useDispatch } from "react-redux";

// Create Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer, // Authentication state
    addCategory: addCategoryReducer, // Category state
    addProduct: addProductReducer, // Product state
    categoryList:catergoryListReducer,
  },
});

// TypeScript types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook for better TypeScript support
export const useAppDispatch: () => AppDispatch = useDispatch;

