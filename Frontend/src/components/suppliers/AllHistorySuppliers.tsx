import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye, Trash2, Pencil } from "lucide-react";
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
  },
  {
    id: 2,
    supplier_name: "Supplier B",
    phone: "9876543210",
    address: "456 Oak Rd, City B",
    opening: "2500",
    created_at: "2025-04-03T10:00:00Z",
    updated_at: "2025-04-04T10:00:00Z",
  },
  {
    id: 3,
    supplier_name: "Supplier C",
    phone: "5551112233",
    address: "789 Pine St, City C",
    opening: "3200",
    created_at: "2025-04-05T10:00:00Z",
    updated_at: "2025-04-06T10:00:00Z",
  },
  {
    id: 4,
    supplier_name: "Supplier D",
    phone: "6662223344",
    address: "321 Cedar Ave, City D",
    opening: "4100",
    created_at: "2025-04-07T10:00:00Z",
    updated_at: "2025-04-08T10:00:00Z",
  },
  {
    id: 5,
    supplier_name: "Supplier E",
    phone: "7773334455",
    address: "654 Birch Ln, City E",
    opening: "1500",
    created_at: "2025-04-09T10:00:00Z",
    updated_at: "2025-04-10T10:00:00Z",
  },
  {
    id: 6,
    supplier_name: "Supplier F",
    phone: "8884445566",
    address: "987 Maple Blvd, City F",
    opening: "2900",
    created_at: "2025-04-11T10:00:00Z",
    updated_at: "2025-04-12T10:00:00Z",
  },
  {
    id: 7,
    supplier_name: "Supplier G",
    phone: "9995556677",
    address: "432 Aspen Way, City G",
    opening: "3300",
    created_at: "2025-04-13T10:00:00Z",
    updated_at: "2025-04-14T10:00:00Z",
  },
  {
    id: 8,
    supplier_name: "Supplier H",
    phone: "1116667788",
    address: "123 Elm Dr, City H",
    opening: "2750",
    created_at: "2025-04-15T10:00:00Z",
    updated_at: "2025-04-16T10:00:00Z",
  },
  {
    id: 9,
    supplier_name: "Supplier I",
    phone: "2227778899",
    address: "456 Walnut St, City I",
    opening: "3600",
    created_at: "2025-04-17T10:00:00Z",
    updated_at: "2025-04-18T10:00:00Z",
  },
  {
    id: 10,
    supplier_name: "Supplier J",
    phone: "3338889900",
    address: "789 Chestnut Ave, City J",
    opening: "4200",
    created_at: "2025-04-19T10:00:00Z",
    updated_at: "2025-04-20T10:00:00Z",
  },
  {
    id: 11,
    supplier_name: "Supplier K",
    phone: "4449990011",
    address: "147 Palm St, City K",
    opening: "2700",
    created_at: "2025-04-21T10:00:00Z",
    updated_at: "2025-04-22T10:00:00Z",
  },
  {
    id: 12,
    supplier_name: "Supplier L",
    phone: "5550001122",
    address: "258 Magnolia Rd, City L",
    opening: "1900",
    created_at: "2025-04-23T10:00:00Z",
    updated_at: "2025-04-24T10:00:00Z",
  },
  {
    id: 13,
    supplier_name: "Supplier M",
    phone: "6661112233",
    address: "369 Redwood Blvd, City M",
    opening: "3400",
    created_at: "2025-04-25T10:00:00Z",
    updated_at: "2025-04-26T10:00:00Z",
  },
  {
    id: 14,
    supplier_name: "Supplier N",
    phone: "7772223344",
    address: "471 Fir Ln, City N",
    opening: "2200",
    created_at: "2025-04-27T10:00:00Z",
    updated_at: "2025-04-28T10:00:00Z",
  },
  {
    id: 15,
    supplier_name: "Supplier O",
    phone: "8883334455",
    address: "582 Spruce Ave, City O",
    opening: "4000",
    created_at: "2025-04-29T10:00:00Z",
    updated_at: "2025-04-30T10:00:00Z",
  },
  {
    id: 16,
    supplier_name: "Supplier P",
    phone: "9994445566",
    address: "693 Willow Blvd, City P",
    opening: "3100",
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-02T10:00:00Z",
  },
  {
    id: 17,
    supplier_name: "Supplier Q",
    phone: "1115556677",
    address: "714 Poplar St, City Q",
    opening: "3700",
    created_at: "2025-05-03T10:00:00Z",
    updated_at: "2025-05-04T10:00:00Z",
  },
  {
    id: 18,
    supplier_name: "Supplier R",
    phone: "2226667788",
    address: "825 Sequoia Rd, City R",
    opening: "2950",
    created_at: "2025-05-05T10:00:00Z",
    updated_at: "2025-05-06T10:00:00Z",
  },
  {
    id: 19,
    supplier_name: "Supplier S",
    phone: "3337778899",
    address: "936 Acacia Blvd, City S",
    opening: "2400",
    created_at: "2025-05-07T10:00:00Z",
    updated_at: "2025-05-08T10:00:00Z",
  },
  {
    id: 20,
    supplier_name: "Supplier T",
    phone: "4448889900",
    address: "1047 Dogwood Ln, City T",
    opening: "2800",
    created_at: "2025-05-09T10:00:00Z",
    updated_at: "2025-05-10T10:00:00Z",
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

  const handleView = (id: number) => {
    console.log(`Viewing supplier with ID: ${id}`);
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-supplier/${id}`);
  };

  const handleDelete = (id: number) => {
    setSuppliers((prev) => prev.filter((s) => s.id !== id));
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
              {["Name", "Phone", "Address", "Opening Balance", "Created At", "Updated At", "Actions"].map(
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
            {paginatedSuppliers.map((supplier) => (
              <TableRow key={supplier.id}>
                <TableCell className="px-5 py-4 text-start">{supplier.supplier_name}</TableCell>
                <TableCell className="px-5 py-4 text-start">{supplier.phone}</TableCell>
                <TableCell className="px-5 py-4 text-start">{supplier.address}</TableCell>
                <TableCell className="px-5 py-4 text-start">${supplier.opening}</TableCell>
                <TableCell className="px-5 py-4 text-start text-xs text-gray-500">
                  {new Date(supplier.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-start text-xs text-gray-500">
                  {new Date(supplier.updated_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="px-5 py-4 text-start">
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(supplier.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleEdit(supplier.id)}
                      className="text-green-500 hover:text-green-700"
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