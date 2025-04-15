import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductService } from "../../services/addProductService";

// Initial state structure
const initialState = {
  loading: false,
  success: false,
  error: null,
  productData: null,
};

// Async thunk to handle adding a product
export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await addProductService(formData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice to manage the product state
const addProductSlice = createSlice({
  name: "addProduct",
  initialState,
  reducers: {
    // Reset product state
    resetProductState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.productData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.productData = action.payload;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

// Export the reset action to be dispatched
export const { resetProductState } = addProductSlice.actions;

// Default export for the reducer
export default addProductSlice.reducer;
