// ManageProductRow.jsx
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import Modal from "../SharedElements/Modal";
import Text from "../SharedElements/Text";
import { FaTrash } from "react-icons/fa";

export default function ManageProductRow({ prod, onAction }) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [form, setForm] = useState({
    name: prod.name,
    description: prod.description,
    price: prod.price,
    quantity: prod.quantity,
    categoryId: prod.categoryId?._id || "",
    images: prod.images?.length ? prod.images : [""],
  });
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const myTheme = useSelector((state) => state.theme);

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((res) => setCategories(res.data.data || []))
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  // ✅ Handle input changes
  function handleChange(e, index) {
    const { name, value } = e.target;
    if (name === "images") {
      const newImages = [...form.images];
      newImages[index] = value;
      setForm({ ...form, images: newImages });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  // ✅ Add/remove image fields
  function addImageField() {
    setForm({ ...form, images: [...form.images, ""] });
  }

  function removeImageField(index) {
    const newImages = form.images.filter((_, i) => i !== index);
    setForm({ ...form, images: newImages.length ? newImages : [""] });
  }

  // ✅ Update Product
  function handleUpdate() {
  axiosInstance
    .put(`/products/${prod._id}`, { ...form })
    .then((res) => {
      const updatedProd = res.data.data; // تأكد إن الباك يرجع _id و categoryId
      setToast({ show: true, type: "success", message: "Product updated successfully." });
      setEditing(false);
      onAction(updatedProd);
    })
    .catch((err) => {
      console.error("Error updating product:", err);
      setToast({ show: true, type: "error", message: "Failed to update product." });
    });
}
  // ✅ Delete Product
  function handleDelete() {
  axiosInstance
    .delete(`/products/${prod._id}`)
    .then(() => {
      setToast({
        show: true,
        type: "success",
        message: "Product deleted successfully.",
      });
      setConfirmDelete(false);

      // 🔹 تمرير الـ _id للـ parent ليتم حذف المنتج فوراً من state
      onAction(prod._id);
    })
    .catch((err) => {
      console.error("Error deleting product:", err);
      setToast({
        show: true,
        type: "error",
        message: "Failed to delete product.",
      });
    });
}


  return (
    <>
      {/* ✅ Alert */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[60%]">
          <Alert
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ ...toast, show: false })}
          />
        </div>
      )}

      {/* ✅ Edit Modal */}
      <Modal isOpen={editing} onClose={() => setEditing(false)}>
        <h2 className="text-lg font-bold mb-4 text-center text-green-700 dark:text-green-400">
          Edit Product
        </h2>

        <div className="space-y-3">
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          />
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          />
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="Quantity"
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          />
          <select
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          {/* ✅ Images URLs */}
          <div className="flex flex-col gap-2">
            {form.images.map((img, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <input
                  type="text"
                  name="images"
                  value={img}
                  onChange={(e) => handleChange(e, idx)}
                  placeholder="Enter image URL"
                  className={`flex-1 p-2 border rounded-md focus:ring-2 outline-none transition-all
                    ${myTheme === "dark"
                      ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                      : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
                />
                <Button 
                  myClass={`bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200`}
                  onClick={() => removeImageField(idx)}
                  content={
                            <Text
                              as="span"
                              MyClass="flex items-center justify-center gap-2 w-full text-white"
                              content={
                                <>
                                  <FaTrash className="w-5 h-5" />
                                  Remove
                                </>
                              }
                            />
                          }
                      />
              </div>
            ))}
            <button
              type="button"
              onClick={addImageField}
            myClass={`w-40 h-12 flex items-center justify-center gap-2 font-medium 
                    bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                    rounded-xl shadow-md 
                    hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                    active:scale-95 transition-all duration-200`}            >
              + Add another image
            </button>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button
              content="Save"
              myClass="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={handleUpdate}
            />
            <Button
              content="Cancel"
              myClass="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              onClick={() => setEditing(false)}
            />
          </div>
        </div>
      </Modal>

      {/* ✅ Delete Confirmation Modal */}
      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <h2 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400 text-center">
          Confirm Delete
        </h2>
        <p className="text-center mb-4">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{prod.name}</span>?
        </p>
        <div className="flex justify-center gap-3">
          <Button
            content="Yes, Delete"
            myClass="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={handleDelete}
          />
          <Button
            content="Cancel"
            myClass="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={() => setConfirmDelete(false)}
          />
        </div>
      </Modal>

      {/* ✅ Table Row */}
      <tr
        className={`transition-all duration-200 border-b rounded-lg shadow-sm md:shadow-none md:table-row block mb-3 md:mb-0 overflow-hidden
          ${myTheme === "dark"
            ? "bg-neutral-800 text-gray-100 border-neutral-700 hover:bg-neutral-700"
            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"}`}
      >
        <td className="p-3 md:table-cell block before:content-['Image:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          <img
            src={prod.images?.length > 0 ? prod.images[0] : "/placeholder.png"}
            alt={prod.name}
            className="w-12 h-12 object-cover rounded"
          />
        </td>
        <td className="p-3 md:table-cell block before:content-['Name:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {prod.name}
        </td>
        <td className="p-3 md:table-cell block before:content-['Category:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {prod.categoryId?.name || "N/A"}
        </td>
        <td className="p-3 md:table-cell block before:content-['Quantity:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {prod.quantity}
        </td>
        <td className="p-3 md:table-cell block before:content-['Price:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          ${prod.price}
        </td>
        <td className="p-3 md:table-cell block before:content-['Description:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {prod.description || "-"}
        </td>
        <td className="p-3 flex  gap-2 justify-start md:justify-center">
            <Button
              content="Edit"
              myClass={`bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] text-white px-4 py-2 rounded-xl 
                        shadow-md hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] active:scale-95 transition-all`}            
              onClick={() => setEditing(true)}
            />
            <Button
              myClass={`bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200`}
              onClick={() => setConfirmDelete(true)}
              content={
                      <Text
                        as="span"
                        MyClass="flex items-center justify-center gap-2 w-full text-white"
                        content={
                          <>
                            <FaTrash className="w-5 h-5" />
                            Remove
                          </>
                        }
                      />
              } 
            />
        </td>
      </tr>
    </>
  );
}
