import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Pencil, Trash2 } from "lucide-react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router";

interface Supplier {
  id: number;
  supplier_name: string;
  phone: string;
  address: string;
  opening: string;
  created_at: string;
  updated_at: string;
  isActive: boolean;
}

const sampleSuppliers: Supplier[] = [
  {
    id: 1,
    supplier_name: "Supplier A",
    phone: "1234567890",
    address: "123 Main St, City A",
    opening: "5000",
    created_at: "2025-04-01T10:00:00Z",
    updated_at: "2025-04-02T10:00:00Z",
    isActive: true,
  },
  {
    id: 2,
    supplier_name: "Supplier B",
    phone: "9876543210",
    address: "456 Oak Rd, City B",
    opening: "2500",
    created_at: "2025-04-03T10:00:00Z",
    updated_at: "2025-04-04T10:00:00Z",
    isActive: false,
  },
  {
    id: 3,
    supplier_name: "Supplier C",
    phone: "1122334455",
    address: "789 Pine St, City C",
    opening: "3200",
    created_at: "2025-04-05T10:00:00Z",
    updated_at: "2025-04-06T10:00:00Z",
    isActive: true,
  },
  {
    id: 4,
    supplier_name: "Supplier D",
    phone: "5566778899",
    address: "101 Maple Ave, City D",
    opening: "4100",
    created_at: "2025-04-07T10:00:00Z",
    updated_at: "2025-04-08T10:00:00Z",
    isActive: true,
  },
  {
    id: 5,
    supplier_name: "Supplier E",
    phone: "9988776655",
    address: "202 Elm St, City E",
    opening: "1500",
    created_at: "2025-04-09T10:00:00Z",
    updated_at: "2025-04-10T10:00:00Z",
    isActive: false,
  },
  {
    id: 6,
    supplier_name: "Supplier F",
    phone: "4433221100",
    address: "303 Birch Rd, City F",
    opening: "2700",
    created_at: "2025-04-11T10:00:00Z",
    updated_at: "2025-04-12T10:00:00Z",
    isActive: true,
  },
  {
    id: 7,
    supplier_name: "Supplier G",
    phone: "1231231234",
    address: "404 Cedar Ln, City G",
    opening: "3600",
    created_at: "2025-04-13T10:00:00Z",
    updated_at: "2025-04-14T10:00:00Z",
    isActive: false,
  },
  {
    id: 8,
    supplier_name: "Supplier H",
    phone: "3213214321",
    address: "505 Walnut St, City H",
    opening: "4800",
    created_at: "2025-04-15T10:00:00Z",
    updated_at: "2025-04-16T10:00:00Z",
    isActive: true,
  },
  {
    id: 9,
    supplier_name: "Supplier I",
    phone: "5551112222",
    address: "606 Willow Rd, City I",
    opening: "1900",
    created_at: "2025-04-17T10:00:00Z",
    updated_at: "2025-04-18T10:00:00Z",
    isActive: false,
  },
  {
    id: 10,
    supplier_name: "Supplier J",
    phone: "6667778888",
    address: "707 Ash St, City J",
    opening: "3300",
    created_at: "2025-04-19T10:00:00Z",
    updated_at: "2025-04-20T10:00:00Z",
    isActive: true,
  },
  {
    id: 11,
    supplier_name: "Supplier K",
    phone: "2223334444",
    address: "808 Beech Ave, City K",
    opening: "2950",
    created_at: "2025-04-21T10:00:00Z",
    updated_at: "2025-04-22T10:00:00Z",
    isActive: true,
  },
  {
    id: 12,
    supplier_name: "Supplier L",
    phone: "1112223333",
    address: "909 Spruce St, City L",
    opening: "4200",
    created_at: "2025-04-23T10:00:00Z",
    updated_at: "2025-04-24T10:00:00Z",
    isActive: false,
  },
  {
    id: 13,
    supplier_name: "Supplier M",
    phone: "8889990000",
    address: "1010 Chestnut Rd, City M",
    opening: "3800",
    created_at: "2025-04-25T10:00:00Z",
    updated_at: "2025-04-26T10:00:00Z",
    isActive: true,
  },
  {
    id: 14,
    supplier_name: "Supplier N",
    phone: "3334445555",
    address: "1111 Poplar Ln, City N",
    opening: "1700",
    created_at: "2025-04-27T10:00:00Z",
    updated_at: "2025-04-28T10:00:00Z",
    isActive: true,
  },
  {
    id: 15,
    supplier_name: "Supplier O",
    phone: "4445556666",
    address: "1212 Sycamore Ave, City O",
    opening: "2600",
    created_at: "2025-04-29T10:00:00Z",
    updated_at: "2025-04-30T10:00:00Z",
    isActive: false,
  },
  {
    id: 16,
    supplier_name: "Supplier P",
    phone: "7778889999",
    address: "1313 Magnolia St, City P",
    opening: "3100",
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-02T10:00:00Z",
    isActive: true,
  },
  {
    id: 17,
    supplier_name: "Supplier Q",
    phone: "9990001111",
    address: "1414 Dogwood Rd, City Q",
    opening: "3900",
    created_at: "2025-05-03T10:00:00Z",
    updated_at: "2025-05-04T10:00:00Z",
    isActive: true,
  },
  {
    id: 18,
    supplier_name: "Supplier R",
    phone: "0001112222",
    address: "1515 Fir St, City R",
    opening: "2000",
    created_at: "2025-05-05T10:00:00Z",
    updated_at: "2025-05-06T10:00:00Z",
    isActive: false,
  },
  {
    id: 19,
    supplier_name: "Supplier S",
    phone: "1113335555",
    address: "1616 Alder Ln, City S",
    opening: "4400",
    created_at: "2025-05-07T10:00:00Z",
    updated_at: "2025-05-08T10:00:00Z",
    isActive: true,
  },
  {
    id: 20,
    supplier_name: "Supplier T",
    phone: "2224446666",
    address: "1717 Redwood Ave, City T",
    opening: "2300",
    created_at: "2025-05-09T10:00:00Z",
    updated_at: "2025-05-10T10:00:00Z",
    isActive: false,
  },
];

const AllHistorySuppliers = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(sampleSuppliers);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();
  const itemsPerPage = 10;

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.supplier_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSuppliers.length / itemsPerPage);

  const paginatedSuppliers = filteredSuppliers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const ToggleSwitch = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) => (
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

  const handleDelete = (id: number) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
  };

  const handleToggleStatus = (id: number) => {
    setSuppliers((prev) =>
      prev.map((supplier) =>
        supplier.id === id
          ? { ...supplier, isActive: !supplier.isActive }
          : supplier
      )
    );
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Search and Add Supplier */}
        <div className="flex justify-between items-center p-4 flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search suppliers..."
            className="dark:bg-dark-900 h-11 w-full md:w-1/3 rounded-lg border border-gray-200 bg-transparent py-2.5 pl-4 pr-4 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button
            onClick={() => navigate("/add-supliers")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Add Supplier
          </Button>
        </div>

        <Table>
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              {[
                "Name",
                "Phone",
                "Address",
                "Created At",
                "Updated At",
                "Status",
                "Actions",
              ].map((heading) => (
                <TableCell
                  key={heading}
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-xs uppercase dark:text-gray-400"
                >
                  {heading}
                </TableCell>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="px-5 py-4 text-start">
                  {supplier.supplier_name}
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  {supplier.phone}
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  {supplier.address}
                </TableCell>
                <TableCell className="px-5 py-4 text-xs text-gray-500">
                  {new Date(supplier.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-xs text-gray-500">
                  {new Date(supplier.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4">
                  <ToggleSwitch
                    checked={supplier.isActive}
                    onChange={() => handleToggleStatus(supplier.id)}
                  />
                </TableCell>
                <TableCell className="px-5 py-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => navigate(`/edit-category/`)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
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

export default AllHistorySuppliers;
