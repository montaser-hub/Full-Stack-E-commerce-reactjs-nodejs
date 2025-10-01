import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShoppingCard from "../Components/ShoppingCard";
import OrderSummary from "../Components/OrderSummary";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/TestAxiosInstance";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [alert, setAlert] = useState(null);

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      const res = await axiosInstance.get("/carts");
      const cart = res.data.data;
      const detailedItems = await Promise.all(
        cart.items.map(async (item) => {
          const prodRes = await axiosInstance.get(
            `/products/${item.productId._id}`
          );
          const prod = prodRes.data.data;
          return {
            id: item.productId._id.toString(),
            src: prod.images[0],
            alt: prod.name,
            productName: prod.name,
            price: item.priceAtTime,
            quantity: item.quantity,
          };
        })
      );
      setCartItems(detailedItems);
      setTotalPrice(cart.totalPrice || 0);
    } catch (err) {
      console.error("Error fetching cart:", err.response?.data);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to load cart.",
      });
    }
  };

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  const handleUpdateQuantity = async (id, newQuantity) => {
    try {
      await axiosInstance.patch(`/carts/${id}`, {
        quantity: Math.max(1, newQuantity),
      });
      await fetchCart();
      setAlert({ type: "info", message: "Quantity updated successfully!" });
    } catch (err) {
      console.error("Error updating quantity:", err.response?.data);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to update quantity.",
      });
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axiosInstance.delete(`/carts/${id}`);
      await fetchCart();
      setAlert({ type: "success", message: "Item removed from cart!" });
    } catch (err) {
      console.error("Error removing item:", err.response?.data);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to remove item.",
      });
    }
  };

  const handlePlaceOrder = async () => {
    try {
      await axiosInstance.post("/carts", {
        titleCart: "Shopping Cart",
        items: [],
      });
      await fetchCart();
      setAlert({
        type: "success",
        message: "Cart cleared successfully!",
      });
    } catch (err) {
      console.error("Error clearing cart:", err.response?.data);
      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to clear cart.",
      });
    }
  };

  const subtotal = totalPrice;
  const shipping = 20;
  const tax = (subtotal * 0.08).toFixed(2);
  const discount = 10;
  const total = (subtotal + shipping + parseFloat(tax) - discount).toFixed(2);

  return (
    <div className="p-4 relative">
      {/* Alert */}
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      {/* Page Title */}
      <div className="flex justify-center mb-10">
        <Text
          as="h1"
          content="Your Shopping Cart"
          MyClass="text-[30px] leading-[36px] font-bold font-['Archivo']"
        />
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <ShoppingCard
              key={item.id}
              src={item.src}
              alt={item.alt}
              productName={item.productName}
              price={item.price}
              quantity={item.quantity}
              onUpdate={(newQty) => handleUpdateQuantity(item.id, newQty)}
              onRemove={() => handleRemoveItem(item.id)}
            />
          ))}
        </div>
        <div>
          <OrderSummary
            items={cartItems}
            subtotal={`$${subtotal}`}
            shipping={`$${shipping}`}
            tax={`$${tax}`}
            discount={`-$${discount}`}
            total={`$${total}`}
            onPlaceOrder={handlePlaceOrder}
          />
          <Button
            content="Proceed to Checkout"
            onClick={() => navigate("/checkout")}
            myClass="w-full bg-[rgb(67,94,72)] hover:bg-[rgb(57,84,62)] text-white py-2 rounded-lg mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
