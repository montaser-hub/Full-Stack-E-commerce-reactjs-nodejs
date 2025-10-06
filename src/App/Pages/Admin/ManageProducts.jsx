import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import Text from "../../SharedElements/Text";
import Button from "../../SharedElements/Button";
import ManageProductRow from "../../Components/ManageProducts";
import Pagination from "../../Components/Pagination";
import { useSelector } from "react-redux";
import ProductForm from "../../Components/ProductForm";

export default function ManageProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const myTheme = useSelector((state) => state.theme);

  const fetchProducts = useCallback(() => {
    axiosInstance
      .get(`/products?page=${currentPage}&limit=5`)
      .then((res) => {
        setProducts(res.data.data || []);
        const total = res.data.totalProducts || 0;
        setTotalPages(Math.ceil(total / 5) || 1);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const filteredProducts = products.filter((prod) =>
    (prod.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  function handleProductAction(actionOrId) {
  if (typeof actionOrId === "string") {

    setProducts((prev) => prev.filter((p) => p._id !== actionOrId));
  } else if (actionOrId?._id) {

    setProducts((prev) =>
      prev.map((p) => (p._id === actionOrId._id ? actionOrId : p))
    );
  }
}


  return (
    <div className={`min-h-screen p-6 ${myTheme === "dark" ? "bg-neutral-900" : "bg-gray-100"}`}>
      <div className="p-6">
        <div className={`p-6 rounded-xl shadow-md ${myTheme === "dark" ? "bg-neutral-800" : "bg-white"}`}>
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Text
              as="h1"
              content="Manage Products"
              MyClass={`text-xl font-bold ${myTheme === "dark" ? "text-gray-200" : "text-gray-800"}`}
            />
            <Button
            myClass={`bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] text-white px-4 py-2 rounded-xl 
                        shadow-md hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] active:scale-95 transition-all`}              
                    content={showForm ? "Close Form" : "Create Product"}
              onClick={() => setShowForm(!showForm)}
            />
          </div>

          {/* Create Form */}
          {showForm && (
            <div className="p-4 border rounded-md mb-6">
              <ProductForm
                onSuccess={(newProd) => {
                  setShowForm(false);
                  setProducts((prev) => [newProd, ...prev]);
                }}
              />
            </div>
          )}

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                myTheme === "dark"
                  ? "bg-neutral-700 text-white border-neutral-600 placeholder-gray-400"
                  : "bg-white text-black border-gray-300 placeholder-gray-500"
              }`}
            />
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full border-collapse">
              <thead>
                <tr className={`${myTheme === "dark" ? "bg-neutral-700" : "bg-gray-100"}`}>
                  <th className={`p-2 text-left ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Image</th>
                  <th className={`p-2 text-left ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Name</th>
                  <th className={`p-2 text-left ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Category</th>
                  <th className={`p-2 text-left ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Quantity</th>
                  <th className={`p-2 text-left ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Price</th>
                  <th className={`p-2 text-left ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Description</th>
                  <th className={`pr-[6rem]  text-right ${myTheme === "dark" ? "text-gray-200" : "text-gray-700"}`}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((prod) => (
                    <ManageProductRow
                      key={prod._id}
                      prod={prod}
                      onAction={handleProductAction}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className={`p-2 text-center ${myTheme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              maxVisiblePages={5}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
