// categoryListSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCategoryAPI } from "../../../services/fetchCategoryService";
import toast from "react-hot-toast";

interface CategoryData {
  name: string;
  description: string;
}

interface CategoryListState {
  categories: CategoryData[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CategoryListState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const fetchCategoryAction = createAsyncThunk(
  "category/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategoryAPI();
      return response.data;  // or response depending on structure
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to fetch categories.");
      return rejectWithValue(error.response?.data);
    }
  }
);

const categoryListSlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoryAction.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload + "tesa");
        state.categories = action.payload; // adjust this
      })
      .addCase(fetchCategoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default categoryListSlice.reducer;
