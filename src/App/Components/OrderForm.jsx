import { useState, useEffect } from "react";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Button from "../SharedElements/Button";
import Text from "../SharedElements/Text";
import Alert from "../SharedElements/Alert";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";

export default function OrderForm({ onSuccess }) {
  const [form, setForm] = useState({
    shippingAddress: "",
    shippingPrice: "",
    paymentMethodType: "cash",
    totalOrderPrice: "",
    cartItems: [{ product: "", quantity: "", price: "" }], // array of items
  });

  const [ setUsers] = useState([]); 
  const myTheme = useSelector((state) => state.theme);

  const [showToast, setShowToast] = useState({
    show: false,
    type: "info",
    message: "",
  });

  useEffect(() => {
    // Fetch users if needed for admin to select user
    axiosInstance
      .get("/users")
      .then((res) => setUsers(res.data.data || []))
      .catch((err) => console.error("Error fetching users:", err));
  }, [setUsers]);

  function handleChange(e, index = null) {
    const { name, value } = e.target;
    if (name === "cartItems" && index !== null) {
      const newItems = [...form.cartItems];
      newItems[index][e.target.dataset.field] = value;
      setForm({ ...form, cartItems: newItems });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function addItemField() {
    setForm({ ...form, cartItems: [...form.cartItems, { product: "", quantity: "", price: "" }] });
  }

  function removeItemField(index) {
    const newItems = form.cartItems.filter((_, i) => i !== index);
    setForm({ ...form, cartItems: newItems.length ? newItems : [{ product: "", quantity: "", price: "" }] });
  }

  function handleSubmit(e) {
    e.preventDefault();

    axiosInstance
      .post("/orders", form)
      .then((res) => {
        setShowToast({
          show: true,
          type: "success",
          message: "✅ Order added successfully!",
        });
        setForm({
          shippingAddress: "",
          shippingPrice: "",
          paymentMethodType: "cash",
          totalOrderPrice: "",
          cartItems: [{ product: "", quantity: "", price: "" }],
        });
        onSuccess(res.data); // return the created order
      })
      .catch((err) => {
        console.error("Error adding order:", err.response?.data || err);
        setShowToast({
          show: true,
          type: "error",
          message: "❌ Failed to add order!",
        });
      });
  }

  return (
    <div className="relative flex justify-center items-center py-10 px-4">
      {showToast.show && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[90%] sm:w-[60%] z-50">
          <Alert
            type={showToast.type}
            message={showToast.message}
            onClose={() => setShowToast({ ...showToast, show: false })}
          />
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className={`w-full sm:w-[500px] md:w-[600px] rounded-2xl shadow-xl border transition-all duration-300 ${
          myTheme === "dark"
            ? "bg-neutral-900 border-neutral-700 text-gray-100"
            : "bg-white border-gray-200 text-gray-800"
        }`}
      >
        <div className={`rounded-t-2xl px-6 py-4 border-b text-center font-semibold text-lg ${
          myTheme === "dark"
            ? "bg-neutral-800 border-neutral-700 text-green-300"
            : "bg-gray-50 border-gray-200 text-green-700"
        }`}>
          ➕ Add New Order
        </div>

        <div className="p-6 flex flex-col gap-5">
          {/* Shipping Address */}
          <Text as="label" content="Shipping Address" className="font-medium text-sm" />
          <input
            type="text"
            name="shippingAddress"
            value={form.shippingAddress}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border focus:ring-2 outline-none"
          />

          {/* Shipping Price */}
          <Text as="label" content="Shipping Price" className="font-medium text-sm" />
          <input
            type="number"
            name="shippingPrice"
            value={form.shippingPrice}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border focus:ring-2 outline-none"
          />

          {/* Payment Method */}
          <Text as="label" content="Payment Method" className="font-medium text-sm" />
          <select
            name="paymentMethodType"
            value={form.paymentMethodType}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border focus:ring-2 outline-none"
          >
            <option value="cash">Cash</option>
            <option value="paypal">PayPal</option>
            {/* Add more if needed */}
          </select>

          {/* Total Price */}
          <Text as="label" content="Total Price" className="font-medium text-sm" />
          <input
            type="number"
            name="totalOrderPrice"
            value={form.totalOrderPrice}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border focus:ring-2 outline-none"
          />

          {/* Cart Items */}
          <Text as="label" content="Cart Items" className="font-medium text-sm" />
          {form.cartItems.map((item, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <input
                type="text"
                data-field="product"
                placeholder="Product ID"
                value={item.product}
                onChange={(e) => handleChange(e, idx)}
                className="p-2 rounded-xl border flex-1"
              />
              <input
                type="number"
                data-field="quantity"
                placeholder="Quantity"
                value={item.quantity}
                onChange={(e) => handleChange(e, idx)}
                className="p-2 rounded-xl border w-20"
              />
              <input
                type="number"
                data-field="price"
                placeholder="Price"
                value={item.price}
                onChange={(e) => handleChange(e, idx)}
                className="p-2 rounded-xl border w-20"
              />
              {idx > 0 && (
                <Button
                  myClass={`bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition-colors duration-200`}
                  onClick={() => removeItemField(idx)}
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
              )}
            </div>
          ))}
          <Button
            content="Add Item"
            myClass={`text-white w-40 h-12 flex items-center justify-center gap-2 font-medium 
                    bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] rounded-xl shadow-md 
                    hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] active:scale-95 transition-all duration-200`}
            onClick={addItemField}
          />
        </div>

        <div className="px-6 py-4 border-t flex justify-end">
          <Button
            type="submit"
            myClass="bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] text-white px-4 py-2 rounded-xl 
                shadow-md hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] active:scale-95 transition-all"
            content="Add Order"
          />
        </div>
      </form>
    </div>
  );
}