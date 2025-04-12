import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import TextArea from "../form/input/TextArea";

const AddCategoryProduct = () => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  // Handle form submission for adding category product
  const handleSubmit = async () => {
    try {
      const newCategoryProduct = {
        categoryName,
        description,
        createdAt,
        updatedAt,
      };

      // API Call to Save Category Product (replace with actual API)
      const { data } = await axios.post(
        "/api/category-product/add",
        newCategoryProduct
      );

      if (data.success) {
        toast.success(data.message);

        // Reset the form fields after success
        setCategoryName("");
        setDescription("");
        setCreatedAt("");
        setUpdatedAt("");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Category">
      <div className="space-y-6">
        {/* Category Name Input */}
        <div>
          <Label>Category Name</Label>
          <Input
            placeholder="Enter Category Name"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        {/* Description Input */}
        <div>
          <Label>Description</Label>
          <TextArea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Add Category Product
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddCategoryProduct;
