/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ComponentCard from "../common/ComponentCard";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Button from "../ui/button/Button";
import toast from "react-hot-toast";
import axios from "axios";

const NewUnitsAdd = () => {
  const [unitName, setUnitName] = useState("");
  const [pcs, setPcs] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async () => {
    try {
      const newUnit = {
        unit_name: unitName,
        pcs,
        status,
      };

      const { data } = await axios.post("/api/unit/add", newUnit);

      if (data.success) {
        toast.success(data.message || "Unit added successfully!");
        setUnitName("");
        setPcs("");
        setStatus("");
      } else {
        toast.error(data.message || "Failed to add unit.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <ComponentCard title="Add New Unit">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Unit Name</Label>
          <Input
            placeholder="Enter Unit Name"
            type="text"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />
        </div>

        <div>
          <Label>Pcs</Label>
          <Input
            placeholder="Enter PCS"
            type="text"
            value={pcs}
            onChange={(e) => setPcs(e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <Label>Status</Label>
          <Input
            placeholder="Enter Status (e.g. Active, Inactive)"
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <Button
            onClick={handleSubmit}
            className="bg-brand-500 text-white px-4 py-2 rounded mt-6"
          >
            Add Unit
          </Button>
        </div>
      </div>
    </ComponentCard>
  );
};

export default NewUnitsAdd;