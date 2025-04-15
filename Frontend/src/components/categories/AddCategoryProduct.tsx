import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addCategoryAction } from "../../redux/slices/addCategorySlice";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";

const AddCategoryProduct = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.addCategory);

  const handleSubmit = () => {
    const newCategory = { categoryName, description, createdAt };
    dispatch(addCategoryAction(newCategory));

    // Reset form fields
    setCategoryName("");
    setDescription("");
    setCreatedAt("");
  };

  return (
    <ComponentCard title="Add New Category">
      <div className="space-y-6">
        <div>
          <Label>Category Name</Label>
          <Input
            placeholder="Enter Category Name"
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
        </div>

        <div>
          <Label>Description</Label>
          <TextArea
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e)}
          />
        </div>

        <div className="flex justify-end">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            {isLoading ? "Adding..." : "Add Category Product"}
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddCategoryProduct;
