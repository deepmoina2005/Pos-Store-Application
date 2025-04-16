/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCategoryAPI } from "../../services/addCategoryService";
import toast from "react-hot-toast";

// Define the type for categoryData
interface CategoryData {
  name: string;
  description: string; // Adjust the type if needed (Date, String, etc.)
}

// Async thunk for adding category
export const addCategoryAction = createAsyncThunk(
  "category/add",
  async (categoryData: CategoryData, { rejectWithValue }) => {
    try {
      const response = await addCategoryAPI(categoryData);
      toast.success(response.message);
      return response;  // Return the response data
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to add category.");
      return rejectWithValue(error.response?.data);  // Return error data
    }
  }
);

interface AddCategoryState {
  isLoading: boolean;
  isSuccess: boolean;
  error: string | null;
}

const initialState: AddCategoryState = {
  isLoading: false,
  isSuccess: false,
  error: null,
};

const addCategorySlice = createSlice({
  name: "addCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.error = null;
      })
      .addCase(addCategoryAction.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addCategoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.error = action.payload as string;  // Update error with message
      });
  },
});

export default addCategorySlice.reducer;