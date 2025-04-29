/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductAPI, ProductWithImages } from "../../../services/product/addProductService";

interface ProductState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ProductState = {
  loading: false,
  error: null,
  success: false,
};

export const addProductAction = createAsyncThunk(
  "product/addProduct",
  async (productData: ProductWithImages, { rejectWithValue }) => {
    try {
      const response = await addProductAPI(productData);
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || error.message || "Something went wrong";
      return rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProductAction.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProductAction.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProductAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;
