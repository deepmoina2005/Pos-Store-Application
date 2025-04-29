
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { fetchProductAPI } from "../../../services/product/fetchProductService.ts";
import { deleteProductAPI } from "../../../services/product/deleteProductService.ts";

interface ProductData {
    id: number;
    unit_id: number;
    name: string;
    description: string;
    image: string;
    selling_price: number;
    cost_price: number;
    stock: number;
    brand: string;
    category_id: number;
    created_at: string;
    updated_at: string;
}

interface ProductListState {
    products: ProductData[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ProductListState = {
    products: [],
    isLoading: false,
    error: null,
};

// ✅ FETCH
export const fetchProductAction = createAsyncThunk(
    "product/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchProductAPI();
            return response.data;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to fetch products.");
            return rejectWithValue(error.response?.data);
        }
    }
);

// ✅ DELETE
export const deleteProductAction = createAsyncThunk(
    "product/delete",
    async (product: ProductData, { rejectWithValue }) => {
        try {
            await deleteProductAPI(product.id);
            toast.success("Product deleted successfully.");
            return product.id;
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to delete product.");
            return rejectWithValue(error.response?.data);
        }
    }
);

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ FETCH
            .addCase(fetchProductAction.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = action.payload;
            })
            .addCase(fetchProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })

            // ✅ DELETE
            .addCase(deleteProductAction.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(deleteProductAction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.products = state.products.filter((p) => p.id !== action.payload);
            })
            .addCase(deleteProductAction.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export default productSlice.reducer;

