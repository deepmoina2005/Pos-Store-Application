/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import TextArea from "../form/input/TextArea"; // <-- Added
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import axios from "axios";

const AddNewSuppliers = () => {
  const [supplierName, setSupplierName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    try {
      const newSupplier = {
        supplier_name: supplierName,
        phone,
        address,
        description,
      };

      const { data } = await axios.post("/api/supplier/add", newSupplier);

      if (data.success) {
        toast.success(data.message || "Supplier added successfully!");
        setSupplierName("");
        setPhone("");
        setAddress("");
        setDescription("");
      } else {
        toast.error(data.message || "Failed to add supplier.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Supplier">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Supplier Name</Label>
          <Input
            placeholder="Enter Supplier Name"
            type="text"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            placeholder="Enter Phone Number"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Label>Address</Label>
          <Input
            placeholder="Enter Address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Label>Description</Label>
          <TextArea
            placeholder="Enter Description"
            value={description}
            onChange={(e) =>
              setDescription(typeof e === "string" ? e : e)
            }
            rows={4}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Add Supplier
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default AddNewSuppliers;
