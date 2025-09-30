import { useState } from "react";
import ShoppingCard from "../Components/ShoppingCard";
import OrderSummary from "../Components/OrderSummary";
import { orders } from "../Data/orderItems";
import Text from "../SharedElements/Text";
import Alert from "../SharedElements/Alert";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    orders[0].items.map((item, index) => ({
      id: index + 1,
      src: item.src,
      alt: item.alt,
      productName: item.productName,
      price: item.price,
      quantity: parseInt(item.quantity),
    })) || []
  );

  const [alert, setAlert] = useState(null);

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
    setAlert({ type: "info", message: "Quantity updated!" });
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    setAlert({ type: "error", message: "Item removed from cart!" });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 20;
  const tax = (subtotal * 0.08).toFixed(2);
  const discount = 10;
  const total = (subtotal + shipping + parseFloat(tax) - discount).toFixed(2);

  const handlePlaceOrder = () => {
    setCartItems([]);
    setAlert({ type: "success", message: "Order placed successfully!" });
  };

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
        </div>
      </div>
    </div>
  );
};

export default Cart;
