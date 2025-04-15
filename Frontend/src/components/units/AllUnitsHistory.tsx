import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";
import { Pencil, Trash2 } from "lucide-react";

interface Unit {
  id: number;
  unit_name: string;
  created_at: string;
  updated_at: string;
  isActive: boolean;
}

const sampleUnits: Unit[] = [
  { id: 1, unit_name: "Kilogram (kg)", created_at: "2025-04-01T10:00:00Z", updated_at: "2025-04-02T10:00:00Z", isActive: true },
  { id: 2, unit_name: "Liter (L)", created_at: "2025-04-03T10:00:00Z", updated_at: "2025-04-04T10:00:00Z", isActive: true },
  { id: 3, unit_name: "Piece (pc)", created_at: "2025-04-05T10:00:00Z", updated_at: "2025-04-06T10:00:00Z", isActive: false },
  { id: 4, unit_name: "Gram (g)", created_at: "2025-04-07T10:00:00Z", updated_at: "2025-04-08T10:00:00Z", isActive: true },
  { id: 5, unit_name: "Milliliter (ml)", created_at: "2025-04-09T10:00:00Z", updated_at: "2025-04-10T10:00:00Z", isActive: true },
  { id: 6, unit_name: "Dozen (dz)", created_at: "2025-04-11T10:00:00Z", updated_at: "2025-04-12T10:00:00Z", isActive: false },
  { id: 7, unit_name: "Meter (m)", created_at: "2025-04-13T10:00:00Z", updated_at: "2025-04-14T10:00:00Z", isActive: true },
  { id: 8, unit_name: "Centimeter (cm)", created_at: "2025-04-15T10:00:00Z", updated_at: "2025-04-16T10:00:00Z", isActive: true },
  { id: 9, unit_name: "Box", created_at: "2025-04-17T10:00:00Z", updated_at: "2025-04-18T10:00:00Z", isActive: false },
  { id: 10, unit_name: "Pack", created_at: "2025-04-19T10:00:00Z", updated_at: "2025-04-20T10:00:00Z", isActive: true },
  { id: 11, unit_name: "Carton", created_at: "2025-04-21T10:00:00Z", updated_at: "2025-04-22T10:00:00Z", isActive: true },
  { id: 12, unit_name: "Pair", created_at: "2025-04-23T10:00:00Z", updated_at: "2025-04-24T10:00:00Z", isActive: false },
  { id: 13, unit_name: "Bundle", created_at: "2025-04-25T10:00:00Z", updated_at: "2025-04-26T10:00:00Z", isActive: true },
  { id: 14, unit_name: "Roll", created_at: "2025-04-27T10:00:00Z", updated_at: "2025-04-28T10:00:00Z", isActive: false },
  { id: 15, unit_name: "Sachet", created_at: "2025-04-29T10:00:00Z", updated_at: "2025-04-30T10:00:00Z", isActive: true },
  { id: 16, unit_name: "Tablet", created_at: "2025-05-01T10:00:00Z", updated_at: "2025-05-02T10:00:00Z", isActive: true },
  { id: 17, unit_name: "Bottle", created_at: "2025-05-03T10:00:00Z", updated_at: "2025-05-04T10:00:00Z", isActive: false },
  { id: 18, unit_name: "Piece (single)", created_at: "2025-05-05T10:00:00Z", updated_at: "2025-05-06T10:00:00Z", isActive: true },
  { id: 19, unit_name: "Strip", created_at: "2025-05-07T10:00:00Z", updated_at: "2025-05-08T10:00:00Z", isActive: false },
  { id: 20, unit_name: "Serving", created_at: "2025-05-09T10:00:00Z", updated_at: "2025-05-10T10:00:00Z", isActive: true },
];

// Toggle switch component
const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
  <label className="relative inline-flex cursor-pointer items-center">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-indigo-600 transition-colors duration-300 ease-in-out after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all after:duration-300 peer-checked:after:translate-x-5"></div>
  </label>
);

const AllUnitsHistory = () => {
  const [units, setUnits] = useState<Unit[]>(sampleUnits);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  const filteredUnits = units.filter((unit) =>
    unit.unit_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);

  const paginatedUnits = filteredUnits.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = (id: number) => {
    setUnits((prev) => prev.filter((u) => u.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setUnits((prev) =>
      prev.map((unit) =>
        unit.id === id ? { ...unit, isActive: !unit.isActive } : unit
      )
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="flex justify-between items-center p-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search units..."
            className="dark:bg-dark-900 h-11 w-full md:w-1/3 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => navigate("/add-unit")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Unit
          </Button>
        </div>

        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {["Unit Name", "Created At", "Updated At", "Status", "Actions"].map(
                (heading) => (
                  <TableCell
                    key={heading}
                    isHeader
                    className="px-5 py-3 font-medium text-gray-500 text-start text-xs uppercase dark:text-gray-400"
                  >
                    {heading}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedUnits.map((unit) => (
              <TableRow key={unit.id}>
                <TableCell className="px-5 py-4 text-start">{unit.unit_name}</TableCell>
                <TableCell className="px-5 py-4 text-start text-xs text-gray-500">
                  {new Date(unit.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-xs text-gray-500">
                  {new Date(unit.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <ToggleSwitch
                    checked={unit.isActive}
                    onChange={() => handleToggleStatus(unit.id)}
                  />
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <button
                    onClick={() => navigate(`/edit-unit/${unit.id}`)}
                    className="text-blue-500 hover:text-blue-700"
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(unit.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

         {/* Pagination Controls */}
         <div className="flex items-center justify-between px-4 py-4">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            className="text-sm text-gray-600 dark:text-gray-400 disabled:opacity-50"
          >
            ← Previous
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-md text-sm ${
                  currentPage === page
                    ? "bg-indigo-600 text-white"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            className="text-sm text-gray-600 dark:text-gray-400 disabled:opacity-50"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AllUnitsHistory;
