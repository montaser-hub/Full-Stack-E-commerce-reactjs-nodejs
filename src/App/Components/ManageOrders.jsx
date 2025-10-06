import { useState } from "react";
import { useSelector } from "react-redux";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import Modal from "../SharedElements/Modal";
import Text from "../SharedElements/Text";
import { FaTrash } from "react-icons/fa";

export default function ManageOrderRow({ order, onAction }) {
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [form, setForm] = useState({
    status: order.status || "",
    isDelivered: order.isDelivered || false,
    totalOrderPrice: order.totalOrderPrice || "",
    // Add more fields if needed, like shippingAddress
  });
  const [toast, setToast] = useState({ show: false, type: "", message: "" });
  const myTheme = useSelector((state) => state.theme);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  }

  // Update Order (use deliver or custom update)
  function handleUpdate() {
    axiosInstance
      .put(`/orders/${order._id}/deliver`, form) // Or create a new route for full update
      .then((res) => {
        const updatedOrder = res.data.data;
        setToast({ show: true, type: "success", message: "Order updated successfully." });
        setEditing(false);
        onAction(updatedOrder);
      })
      .catch((err) => {
        console.error("Error updating order:", err);
        setToast({ show: true, type: "error", message: "Failed to update order." });
      });
  }

  // Delete/Cancel Order
  function handleDelete() {
    axiosInstance
      .put(`/orders/${order._id}/cancel`)
      .then(() => {
        setToast({
          show: true,
          type: "success",
          message: "Order cancelled successfully.",
        });
        setConfirmDelete(false);
        onAction(order._id); // Pass ID to remove from list
      })
      .catch((err) => {
        console.error("Error cancelling order:", err);
        setToast({
          show: true,
          type: "error",
          message: "Failed to cancel order.",
        });
      });
  }

  return (
    <>
      {/* Alert */}
      {toast.show && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] sm:w-[60%]">
          <Alert
            type={toast.type}
            message={toast.message}
            onClose={() => setToast({ ...toast, show: false })}
          />
        </div>
      )}

      {/* Edit Modal */}
      <Modal isOpen={editing} onClose={() => setEditing(false)}>
        <h2 className="text-lg font-bold mb-4 text-center text-green-700 dark:text-green-400">
          Edit Order
        </h2>

        <div className="space-y-3">
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          >
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <label className="flex items-center">
            <input
              type="checkbox"
              name="isDelivered"
              checked={form.isDelivered}
              onChange={handleChange}
              className="mr-2"
            />
            Delivered
          </label>
          <input
            type="number"
            name="totalOrderPrice"
            value={form.totalOrderPrice}
            onChange={handleChange}
            placeholder="Total Price"
            className={`w-full p-2 border rounded-md focus:ring-2 outline-none transition-all
              ${myTheme === "dark"
                ? "bg-neutral-700 border-neutral-600 text-gray-100 focus:ring-green-500"
                : "bg-white border-gray-300 text-black focus:ring-green-600"}`}
          />
          {/* Add more fields if needed */}
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
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={confirmDelete} onClose={() => setConfirmDelete(false)}>
        <h2 className="text-lg font-bold mb-3 text-red-600 dark:text-red-400 text-center">
          Confirm Cancel
        </h2>
        <p className="text-center mb-4">
          Are you sure you want to cancel order <span className="font-semibold">{order._id}</span>?
        </p>
        <div className="flex justify-center gap-3">
          <Button
            content="Yes, Cancel"
            myClass="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={handleDelete}
          />
          <Button
            content="No"
            myClass="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium"
            onClick={() => setConfirmDelete(false)}
          />
        </div>
      </Modal>

      {/* Table Row */}
      <tr
        className={`transition-all duration-200 border-b rounded-lg shadow-sm md:shadow-none md:table-row block mb-3 md:mb-0 overflow-hidden
          ${myTheme === "dark"
            ? "bg-neutral-800 text-gray-100 border-neutral-700 hover:bg-neutral-700"
            : "bg-white text-gray-800 border-gray-200 hover:bg-gray-50"}`}
      >
        <td className="p-3 md:table-cell block before:content-['Order_ID:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {order._id}
        </td>
        <td className="p-3 md:table-cell block before:content-['Customer:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {order.user?.name || "N/A"}
        </td>
        <td className="p-3 md:table-cell block before:content-['Total:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          ${order.totalOrderPrice || 0}
        </td>
        <td className="p-3 md:table-cell block before:content-['Status:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          <span
            className={`px-2 py-1 rounded text-white ${
              order.status === "pending"
                ? "bg-yellow-500"
                : order.status === "shipped"
                ? "bg-green-500"
                : "bg-gray-400"
            }`}
          >
            {order.status || "N/A"}
          </span>
        </td>
        <td className="p-3 md:table-cell block before:content-['Date:'] md:before:content-none before:font-semibold before:text-gray-500 before:mr-2">
          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
        </td>
        <td className="p-3 flex gap-2 justify-start md:justify-center">
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
                    Cancel
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