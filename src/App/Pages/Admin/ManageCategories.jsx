import { useState, useEffect, useCallback } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import Text from "../../SharedElements/Text";
import Button from "../../SharedElements/Button";
import ManageCategoryRow from "../../Components/ManageCategories";
import Pagination from "../../Components/Pagination";
import { useSelector } from "react-redux";
import CategoryForm from "../../Components/CategoryForm";


export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const myTheme = useSelector((state) => state.theme);

  const fetchCategories = useCallback(() => {
  
axiosInstance.get(`/categories?page=${currentPage}&limit=5`)
    .then((res) => {
      setCategories(res.data.data || []);
      const total = res.data.total || 0;
      setTotalPages(Math.ceil(total / 5) || 1);
    })
    .catch((err) => console.error("Error fetching categories:", err));
}, [currentPage]);


  useEffect(() => {
  fetchCategories();
}, [fetchCategories]);

  const filteredCategories = categories.filter((cat) =>
    (cat.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`min-h-screen p-6 ${
        myTheme === "dark" ? "bg-neutral-900" : "bg-gray-100"
      }`}
    >
      <div className="p-6">
        <div
          className={`p-6 rounded-xl shadow-md ${
            myTheme === "dark" ? "bg-neutral-800" : "bg-white"
          }`}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Text
              as="h1"
              content="Manage Categories"
              MyClass={`text-xl font-bold ${
                myTheme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
            />
            <Button
              myClass="bg-gradient-to-r from-green-700 to-green-500 text-white px-4 py-2 rounded-xl shadow-md hover:from-green-800 hover:to-green-600"
              content={showForm ? "Close Form" : "Create Category"}
              onClick={() => setShowForm(!showForm)}
            />
          </div>

          {/* Create Form */}
          {showForm && (
            <div className="p-4 border rounded-md mb-6">
              <CategoryForm
                onSuccess={() => {
                  setShowForm(false);
                  fetchCategories();
                }}
              />
            </div>
          )}

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
                ${
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
                <tr
                  className={`${
                    myTheme === "dark" ? "bg-neutral-700" : "bg-gray-100"
                  }`}
                >
                  <th
                    className={`p-2 text-left ${
                      myTheme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Name
                  </th>
                  <th
                    className={`p-2 text-left ${
                      myTheme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Description
                  </th>
                  <th
                    className={`p-2 text-left ${
                      myTheme === "dark" ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((cat) => (
                    <ManageCategoryRow
                      key={cat._id}
                      cat={cat}
                      onAction={fetchCategories}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="3"
                      className={`p-2 text-center ${
                        myTheme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      No categories found
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