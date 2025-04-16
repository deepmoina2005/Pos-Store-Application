import axios from "axios";

// Type for product data (without images)
export interface ProductData {
  name: string;
  description: string;
  selling_price: number;
  unit_of_measure: string;
  brand: string;
  category_id: string;
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
    data.images.forEach((file) => {
      formData.append("images", file);
    });

    // Make POST request with multipart/form-data
    const response = await axios.post("http://localhost:3000/product/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data; // Return the response data if successful
  } catch (error) {
    console.error("Error adding product with images:", error);
    throw error;
  }
};
