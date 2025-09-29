import { useState } from "react";
import ShoppingCard from "../Components/ShoppingCard";
import OrderSummary from "../Components/OrderSummary";
import { orderItems } from "../Data/orderItems";

const Cart = () => {
  const [cartItems, setCartItems] = useState(
    orderItems.map((item, index) => ({
      id: index + 1,
      src: item.src,
      alt: item.productName,
      productName: item.productName,
      price: item.productPrice,
      quantity: parseInt(item.productQuantity),
    }))
  );

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 20;
  const tax = (subtotal * 0.08).toFixed(2);
  const discount = 10;
  const total = (subtotal + shipping + parseFloat(tax) - discount).toFixed(2);

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
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
        />
      </div>
    </div>
  );
};

export default Cart;
