import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/TestAxiosInstance";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    shippingAddress: { details: "", street: "", city: "" },
    phoneNumber: "",
    paymentMethodType: "cash",
  });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);
  const [cart, setCart] = useState(null);

  const fetchCart = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/carts");
      setCart(res.data.data);
    } catch (err) {
      setAlert({ type: "error", message: "Failed to load cart." });
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("shippingAddress.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        shippingAddress: { ...prev.shippingAddress, [field]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.shippingAddress.details)
      newErrors.details = "Address details are required";
    if (!formData.shippingAddress.street)
      newErrors.street = "Street is required";
    if (!formData.shippingAddress.city) newErrors.city = "City is required";
    if (!formData.phoneNumber || !/^\+?\d{10,15}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Invalid phone number";
    return newErrors;
  };

  const handlePlaceOrder = async () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      if (!cart || !cart.items.length) {
        setAlert({ type: "error", message: "Your cart is empty." });
        return;
      }

      const orderData = {
        shippingAddress: formData.shippingAddress,
        shippingPrice: 20, // Adjust as needed
        paymentMethodType: formData.paymentMethodType,
      };

      const orderResponse = await axiosInstance.post("/orders", orderData);
      const orderId = orderResponse.data._id;

      if (formData.paymentMethodType === "card") {
        const paypalResponse = await axiosInstance.post(
          `/payments/paypal/${orderId}`
        );
        window.location.href = paypalResponse.data.url;
      } else {
        navigate(`/order-confirmation/${orderId}`);
      }
    } catch (err) {
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to place order.",
      });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 flex justify-center items-center min-h-screen">
      <div className="w-full max-w-3xl bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6">
        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}
        <Text
          as="h1"
          content="Checkout"
          MyClass="text-2xl sm:text-3xl font-bold font-['Archivo'] mb-6 text-center"
        />
        <Text
          as="h2"
          content="Shipping Address"
          MyClass="text-xl font-semibold mb-4"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Address Details
            </label>
            <input
              type="text"
              name="shippingAddress.details"
              value={formData.shippingAddress.details}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md dark:bg-neutral-700 dark:text-white ${
                errors.details ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.details && (
              <p className="text-red-500 text-sm">{errors.details}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Street
            </label>
            <input
              type="text"
              name="shippingAddress.street"
              value={formData.shippingAddress.street}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md dark:bg-neutral-700 dark:text-white ${
                errors.street ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              City
            </label>
            <input
              type="text"
              name="shippingAddress.city"
              value={formData.shippingAddress.city}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md dark:bg-neutral-700 dark:text-white ${
                errors.city ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-white">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className={`w-full p-2 border rounded-md dark:bg-neutral-700 dark:text-white ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>
        </div>
        <Text
          as="h2"
          content="Payment Method"
          MyClass="text-xl font-semibold mb-4"
        />
        <div className="flex gap-4 mb-6">
          <label className="flex items-center gap-2 dark:text-white">
            <input
              type="radio"
              name="paymentMethodType"
              value="cash"
              checked={formData.paymentMethodType === "cash"}
              onChange={handleInputChange}
              className="form-radio"
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2 dark:text-white">
            <input
              type="radio"
              name="paymentMethodType"
              value="card"
              checked={formData.paymentMethodType === "card"}
              onChange={handleInputChange}
              className="form-radio"
            />
            Card Payment
          </label>
        </div>
        <Button
          content={
            formData.paymentMethodType === "cash" ? "Place Order" : "Pay Now"
          }
          onClick={handlePlaceOrder}
          myClass="w-full bg-[rgb(67,94,72)] hover:bg-[rgb(57,84,62)] text-white py-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default Checkout;
