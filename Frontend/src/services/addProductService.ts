import axios from "axios";

// Type for category data
interface ProductData {
    name:string, 
    description:string, 
    selling_price:number, 
    unit_of_measure:string, 
    brand:string, 
    category_id:string
}

// API call for adding a new product
export const addCategoryAPI = async (data: ProductData) => {
  try {
    const response = await axios.post("http://localhost:3000/product/add", data);
    return response.data;  // Return the response data if successful
  } catch (error) {
    // Handle error (e.g., network issue or bad response)
    console.error("Error adding category:", error);
    throw error;  // Rethrow the error so it can be handled elsewhere (e.g., in the component)
  }
};