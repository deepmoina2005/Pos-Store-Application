import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useEffect, useState } from "react";
import { Trash2, PlusCircle, Search } from "lucide-react";
import Button from "../ui/button/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store/store";
import { fetchProductAction } from "../../redux/slices/product/productSlice";

interface Product {
  id: number;
  image: string;
  name: string;
  barcode: string;
  quantity: number;
  price: string;
  status: string;
}

const tableData: Product[] = [
  {
    id: 1,
    image: img2,
    name: "Coca Cola",
    barcode: "123456789",
    quantity: 20,
    price: "$2.50",
    status: "Active",
  },
  {
    id: 2,
    image: img3,
    name: "Basmati Rice",
    barcode: "987654321",
    quantity: 15,
    price: "$1.20",
    status: "Pending",
  },
  {
    id: 3,
    image: img4,
    name: "Fanta",
    barcode: "111223344",
    quantity: 10,
    price: "$3.00",
    status: "Active",
  },
  {
    id: 4,
    image: img5,
    name: "Knorr Soup",
    barcode: "555667788",
    quantity: 12,
    price: "$4.75",
    status: "Active",
  },
  {
    id: 5,
    image: img6,
    name: "Maggi",
    barcode: "999000111",
    quantity: 7,
    price: "$5.10",
    status: "Pending",
  },
  {
    id: 6,
    image: img7,
    name: "Maggi Oats",
    barcode: "333222111",
    quantity: 9,
    price: "$3.30",
    status: "Active",
  },
  {
    id: 7,
    image: img8,
    name: "Seven Up",
    barcode: "222111333",
    quantity: 6,
    price: "$2.90",
    status: "Pending",
  },
  {
    id: 8,
    image: img9,
    name: "Sprite",
    barcode: "444555666",
    quantity: 18,
    price: "$3.40",
    status: "Active",
  },
  {
    id: 9,
    image: img10,
    name: "Top Ramen",
    barcode: "777888999",
    quantity: 4,
    price: "$6.00",
    status: "Active",
  },
  {
    id: 10,
    image: img11,
    name: "Yippee",
    barcode: "000111222",
    quantity: 11,
    price: "$1.80",
    status: "Pending",
  },
];


export default function AllAddedProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.productList.products)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [])
  const handleDelete = (id: number) => {
    dispatch(deleteProductAction(id));
  };


  const handleAddProduct = () => {
    navigate("/add-product");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Header */}
        <div className="flex justify-between p-4">
          <form className="flex gap-2">
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg
                  className="fill-gray-500 dark:fill-gray-400"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                  />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 xl:w-[430px]"
              />
            </div>
          </form>

          <Button
            onClick={handleAddProduct}
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            <PlusCircle className="mr-2" />
            Add Product
          </Button>
        </div>

        {/* Table */}
        <div className="p-2 border rounded-lg m-2">
          <Table>
            <TableHeader className="bg-gray-100 dark:bg-gray-800 text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
              <TableRow>
                <TableCell isHeader className="px-4 py-3">Product Image</TableCell>
                <TableCell isHeader className="px-4 py-3">Product Name</TableCell>
                <TableCell isHeader className="px-4 py-3">Product Price</TableCell>
                <TableCell isHeader className="px-4 py-3">Product Delete</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-200 dark:divide-gray-700 text-center text-sm">
              {paginatedProducts.map((product) => (
                <TableRow key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <TableCell className="px-4 py-3">
                    <div className="w-6 h-6 mx-auto overflow-hidden rounded-full flex items-center justify-center">
                      <img
                        src={`http://localhost:3000${product.image}`}
                        alt={product.name}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 font-medium text-gray-900 dark:text-white">{product.name}</TableCell>
                  <TableCell className="px-4 py-3">{product.selling_price}</TableCell>
                  <TableCell className="px-4 py-3">
                    <div className="flex items-center justify-center">
                      <button onClick={() => handleDelete(product.id)} className="text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 text-gray-500">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="flex items-center gap-2"
        >
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M5.75 12.5h11.5m-11.5 0 4.792-4.791M5.75 12.5l4.792 4.792" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Previous
        </button>

        <div className="flex gap-2">
          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-9 h-9 rounded-md ${currentPage === page ? "bg-indigo-500 text-white" : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
          className="flex items-center gap-2"
        >
          Next
          <svg width="23" height="23" viewBox="0 0 23 23" fill="none">
            <path d="M17.25 11.5H5.75m11.5 0-4.792-4.79m4.792 4.79-4.792 4.792" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}