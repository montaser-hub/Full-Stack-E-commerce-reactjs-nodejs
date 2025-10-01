import { useState, useEffect } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import Text from "../../SharedElements/Text";
import Button from "../../SharedElements/Button";
import Pagination from "../../Components/Pagination";
import ManageProductRow from "../../Components/ManageProducts";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosInstance
      .get(`/products?page=${currentPage}&limit=5`)
      .then((res) => {
        setProducts(res.data.data || []);
        setTotalPages(Math.ceil(res.data.totalProducts / 5));
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, [currentPage]);

  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Text as="h1" content="Manage Products" MyClass="text-xl font-bold" />
            <Button
              myClass="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              content="Create Product"
            />
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Image</th>
                <th className="p-2 text-left">Product Name</th>
                <th className="p-2 text-left">Category</th>
                <th className="p-2 text-left">Quantity</th>
                <th className="p-2 text-left">Price</th>
                <th className="p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <ManageProductRow key={prod._id} prod={prod} />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
}
