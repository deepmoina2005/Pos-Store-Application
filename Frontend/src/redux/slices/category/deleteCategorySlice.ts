import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { deleteCategoryAPI } from "../../../services/category/deleteCategoryService";
interface CategoryData {
  id:number;
  name: string;
  description: string;
  status:boolean;
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

export const deleteCategoryAction = createAsyncThunk(
  "category/update",
  async (category: CategoryData, { rejectWithValue }) => {
    try {
      const response = await deleteCategoryAPI(category);
      toast.success("Category deleted successfully.");
      return response.data; // Adjust based on your API response
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update category.");
      return rejectWithValue(error.response?.data);
    }
  }
);

const deleteCategorySlice = createSlice({
  name: "categoryList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(deleteCategoryAction.pending, (state) => {
      state.isLoading = true;
    })
    .addCase(deleteCategoryAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    })
    .addCase(deleteCategoryAction.fulfilled, (state, action) => {
      const deleteCategory = action.payload;
      state.categories = state.categories.filter((cat) =>
         cat.id !== deleteCategory.i
      );      
    })
  },
});

export default deleteCategorySlice.reducer;
