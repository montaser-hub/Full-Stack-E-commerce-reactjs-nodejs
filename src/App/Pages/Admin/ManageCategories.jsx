import { useState, useEffect } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import Text from "../../SharedElements/Text";
import Button from "../../SharedElements/Button";
import ManageCategoryRow from "../../Components/ManageCategories";
import Pagination from "../../Components/Pagination";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosInstance
      .get(`/categories?page=${currentPage}&limit=5`)
      .then((res) => {
        setCategories(res.data.data || []);
        // Handle cases where totalCategories might be missing or invalid
        const total = res.data.totalCategories || res.data.total || 0;
        setTotalPages(Math.ceil(total / 5) || 1);
      })
      .catch((err) => {
        console.error("Error fetching categories:", err);
      });
  }, [currentPage]);

  const filteredCategories = categories.filter((cat) =>
    (cat.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Text as="h1" content="Manage Categories" MyClass="text-xl font-bold" />
            <Button
              myClass="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              content="Create Category"
            />
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCategories.length > 0 ? (
                filteredCategories.map((cat) => (
                  <ManageCategoryRow key={cat._id} cat={cat} />
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-2 text-center">
                    No categories found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={(page) => {
              setCurrentPage(page);
            }}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
}