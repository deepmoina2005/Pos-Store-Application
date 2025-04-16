/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Select from "../form/Select";
import toast from "react-hot-toast";
import Button from "../ui/button/Button";
import axios from "axios"; // ✅ Added this

const AddProduct = () => {
  const [productImage, setProductImage] = useState<File[]>([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  // const [description,setDescription] = useState("");
  const [productDiscountPrice, setProductDiscountPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [unit, setUnit] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    setProductImage(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [],
      "image/jpeg": [],
      "image/webp": [],
      "image/svg+xml": [],
    },
  });

  const categories = [
    { value: "fruits", label: "Fruits" },
    { value: "vegetables", label: "Vegetables" },
    { value: "dairy", label: "Dairy" },
  ];

  const unitOptions = [
    { value: "kg", label: "Kilogram (kg)" },
    { value: "litre", label: "Litre (litre)" },
    { value: "pcs", label: "Pieces (pcs)" },
    { value: "pack", label: "Pack" },
  ];

  const handleSubmit = async () => {
    // Basic validation
    if (!productName || !productPrice || !category || !unit || !productImage.length) {
      toast.error("Please fill all the fields and upload at least one image.");
      return;
    }

    try {
      const newProduct = {
        productName,
        brand,
        category,
        unit,
        productPrice,
        productDiscountPrice,
      };

      const formData = new FormData();
      formData.append("productData", JSON.stringify(newProduct));
      productImage.forEach((file) => formData.append("images", file));

      const { data } = await axios.post("/api/product/add", formData);

      if (data.success) {
        toast.success(data.message);
        // Reset form
        setProductName("");
        setBrand("");
        setCategory("");
        setUnit("");
        setProductImage([]);
        setProductPrice("");
        setProductDiscountPrice("");
      } else {
        toast.error(data.message);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Product">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Product Name</Label>
          <Input
            placeholder="Product Name"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>

        <div>
          <Label>Product Price</Label>
          <Input
            placeholder="Product Price"
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </div>

        <div>
          <Label>Product Discount Price</Label>
          <Input
            placeholder="Product Discount Price"
            type="number"
            value={productDiscountPrice}
            onChange={(e) => setProductDiscountPrice(e.target.value)}
          />
        </div>

        <div>
          <Label>Brand</Label>
          <Input
            placeholder="Brand"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div>
          <Label>Category</Label>
          <Select
            options={categories}
            placeholder="Select Category"
            onChange={(val: any) => setCategory(val?.value)}
          />
        </div>

        <div>
          <Label>Unit</Label>
          <Select
            options={unitOptions}
            placeholder="Select Unit"
            onChange={(val: any) => setUnit(val?.value)}
          />
        </div>

        {/* Dropzone for images */}
        <div className="md:col-span-2">
          <Label>Upload Product Images</Label>
          <div className="transition border border-gray-300 border-dashed cursor-pointer dark:hover:border-brand-500 dark:border-gray-700 rounded-xl hover:border-brand-500">
            <div
              {...getRootProps()}
              className={`dropzone rounded-xl border-dashed border-gray-300 p-7 lg:p-10
                ${isDragActive
                  ? "border-brand-500 bg-gray-100 dark:bg-gray-800"
                  : "border-gray-300 bg-gray-50 dark:border-gray-700 dark:bg-gray-900"
                }
              `}
            >
              <input {...getInputProps()} />
              <div className="mb-[22px] flex justify-center">
                <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  <svg
                    className="fill-current"
                    width="29"
                    height="28"
                    viewBox="0 0 29 28"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M14.5019 3.91699C14.2852 3.91699 14.0899 4.00891 13.953 4.15589L8.57363 9.53186C8.28065 9.82466 8.2805 10.2995 8.5733 10.5925C8.8661 10.8855 9.34097 10.8857 9.63396 10.5929L13.7519 6.47752V18.667C13.7519 19.0812 14.0877 19.417 14.5019 19.417C14.9161 19.417 15.2519 19.0812 15.2519 18.667V6.48234L19.3653 10.5929C19.6583 10.8857 20.1332 10.8855 20.426 10.5925C20.7188 10.2995 20.7186 9.82463 20.4256 9.53184L15.0838 4.19378C14.9463 4.02488 14.7367 3.91699 14.5019 3.91699ZM5.91626 18.667C5.91626 18.2528 5.58047 17.917 5.16626 17.917C4.75205 17.917 4.41626 18.2528 4.41626 18.667V21.8337C4.41626 23.0763 5.42362 24.0837 6.66626 24.0837H22.3339C23.5766 24.0837 24.5839 23.0763 24.5839 21.8337V18.667C24.5839 18.2528 24.2482 17.917 23.8339 17.917C23.4197 17.917 23.0839 18.2528 23.0839 18.667V21.8337C23.0839 22.2479 22.7482 22.5837 22.3339 22.5837H6.66626C6.25205 22.5837 5.91626 22.2479 5.91626 21.8337V18.667Z"
                    />
                  </svg>
                </div>
              </div>
              <div className="dz-message flex flex-col items-center m-0!">
                <h4 className="mb-3 font-semibold text-gray-800 text-theme-xl dark:text-white/90">
                  {isDragActive ? "Drop Files Here" : "Drag & Drop Files Here"}
                </h4>
                <span className="text-center mb-5 block w-full max-w-[290px] text-sm text-gray-700 dark:text-gray-400">
                  Drag and drop your PNG, JPG, WebP, SVG images here or browse
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Add Product
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddProduct;