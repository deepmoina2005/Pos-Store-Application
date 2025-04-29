import axios from "axios";

// Type for product data (without images)
export interface ProductData {
  name: string;
  selling_price: number;
  unit_id: number;
  brand: string;
  category_id: number;
}

// New type for product data with images
export interface ProductWithImages {
  productData: ProductData;
  images: File[];
}

// API call for adding a new product with images
export const addProductAPI = async (data: ProductWithImages) => {
  try {
    const formData = new FormData();

    // Append productData as JSON string
    formData.append("productData", JSON.stringify(data.productData));

    // Append each image file
    formData.append("image", data.images[0]);

    // Make POST request with multipart/form-data
    const response = await axios.post("http://localhost:3000/product/add", formData);

    return response.data; // Return the response data if successful
  } catch (error) {
    console.error("Error adding product with images:", error);
    throw error;
  }
};
