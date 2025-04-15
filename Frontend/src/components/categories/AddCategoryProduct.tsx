import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { addCategoryAction } from "../../redux/slices/addCategorySlice";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";

interface CategoryData {
  name: string;
  description: string;
}

const AddCategoryProduct = () => {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { isLoading, isSuccess } = useSelector((state: RootState) => state.addCategory);

  const handleSubmit = () => {
    const newCategory: CategoryData = {
      name: categoryName,
      description: description,
    };

    dispatch(addCategoryAction(newCategory));

    // Reset form fields
    setCategoryName("");
    setDescription("");
  };

  // Navigate on successful add
  useEffect(() => {
    if (isSuccess) {
      navigate("/all-categories");
    }
  }, [isSuccess, navigate]);

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