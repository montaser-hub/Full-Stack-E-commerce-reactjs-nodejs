import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCard from "../Components/ShoppingCard";
import OrderSummary from "../Components/OrderSummary";
import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/AxiosInstance.js";
import {
  setCart,
  removeFromCart,
  clearCart,
} from "../../ReduxToolkit/Store";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const [alert, setAlert] = useState(null);
  const subtotal = cartState?.totalPrice;
console.log("cartState:", cartState);
  const handleRemoveItem = async (productId) => {
    const prevItems = [...cartState.cartItems];
    dispatch(removeFromCart(productId));

    try {
      await axiosInstance.delete(`/carts/items/${productId}`);
      setAlert({ type: "success", message: "Item removed" });
    } catch (err) {
      console.error("remove item failed:", err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to remove item",
      });
      dispatch( setCart( {
        items: prevItems,
        totalPrice: prevItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
       }));
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const serverCart = await axiosInstance.get("/carts");///get cart
      const cartId = serverCart.data.data._id;
      await axiosInstance.post("/orders", {
        cartId,
        address: "User default address",
        paymentMethod: "cash",
      });
      setAlert({ type: "success", message: "Order placed successfully" });
      dispatch(clearCart());
      navigate("/order-confirmation/" + new Date().getTime());
    } catch (err) {
      console.error("place order failed:", err);
      setAlert({
        type: "error",
        message: err?.response?.data?.message || "Failed to place order",
      });
    }
  };

  return (
    <div className="p-4 relative">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
          duration={4000}
        />
      )}

      <div className="flex justify-center mb-10">
        <Text
          as="h1"
          content="Your Shopping Cart"
          MyClass="text-[30px] leading-[36px] font-bold font-['Archivo']"
        />{" "}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {cartState.cartItems.length > 0 ? (
            cartState.cartItems.map((item) => (
              <ShoppingCard
                key={item.productId}
                src={item.src || "./not_foundimage.png"}
                alt={item.name}
                productName={item.name}
                price={item.price}
                quantity={item.quantity}
                onRemove={() => handleRemoveItem(item.productId)}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-500">
              Your cart is empty
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center">
          <OrderSummary
            items={cartState.cartItems}
            subtotal={`$${subtotal}`}
            shipping={`$${subtotal > 0 ? 50 : 0}`}
            discount={`$0`}
            total={`$${subtotal > 0 ? subtotal + 50 : 0}`}
            onPlaceOrder={handlePlaceOrder}
          />
          <Button
            myClass="mt-4 w-full max-w-md"
            content="Continue Shopping"
            onClick={() => navigate("/home")}
          />
        </div>
      </div>
    </div>
  );
};

export default Cart;
