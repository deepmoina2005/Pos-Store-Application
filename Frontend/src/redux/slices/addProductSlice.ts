/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addProductAPI, ProductWithImages } from "../../services/addProductService";

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

export const addProduct = createAsyncThunk(
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
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(addProduct.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProductState } = productSlice.actions;
export default productSlice.reducer;