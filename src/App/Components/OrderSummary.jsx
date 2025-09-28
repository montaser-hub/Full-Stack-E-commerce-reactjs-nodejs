import ItemsOrder from "../SharedElements/ItemsOrder";

const OrderSummary = ({ items, subtotal, shipping, tax, discount, total }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md flex flex-col">
      <h2 className="text-xl font-bold mb-4">Order Summary</h2>
      <p className="text-gray-500 text-sm mb-4">
        Review your items and total cost before placing the order.
      </p>

      <div className="flex-1 max-h-64 overflow-y-auto pr-2 space-y-2">
        {items.map((item, index) => (
          <ItemsOrder
            key={index}
            src={item.src}
            alt={item.alt || "image"}
            productName={item.productName}
            productQuantity={item.quantity}
            productPrice={`$${item.price}`}
          />
        ))}
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Subtotal</p>
          <p className="font-medium text-gray-600">{subtotal}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Shipping</p>
          <p className="font-medium text-gray-600">{shipping}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tax (8%)</p>
          <p className="font-medium text-gray-600">{tax}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-red-500">Discount</p>
          <p className="font-medium text-red-500">{discount}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-lg font-bold">Order Total</p>
          <p className="text-lg font-bold text-[#4148c5]">{total}</p>
        </div>
      </div>

      <button className="mt-6 w-full bg-[#4148c5] hover:bg-[#636AE8FF] text-white py-2 rounded-lg">
        Place Order
      </button>
    </div>
  );
};

export default OrderSummary;
