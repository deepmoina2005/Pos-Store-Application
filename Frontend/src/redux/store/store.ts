import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import addCategoryReducer from "../slices/category/addCategorySlice";
import categoryListReducer from "../slices/category/categoryListSlice";
import updateCatergoryReducer from "../slices/category/updateCategorySlice";
import { useDispatch } from "react-redux";

// Create the store with both reducers
export const store = configureStore({
  reducer: {
    auth: authReducer,
    addCategory: addCategoryReducer,
    categoryList: categoryListReducer,
    updateCategoy: updateCatergoryReducer
  },
});

// TypeScript types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook
export const useAppDispatch: () => AppDispatch = useDispatch;