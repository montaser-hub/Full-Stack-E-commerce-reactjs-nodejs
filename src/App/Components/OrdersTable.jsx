import { useState } from "react";
import OrderRow from "./OrderRow";
import Modal from "../SharedElements/Modal";
import OrderSummary from "../Components/OrderSummary";
import Button from "../SharedElements/Button";

export default function OrdersTable({ orders }) {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="w-full border dark:bg-neutral-800 dark:border-neutral-700 rounded-lg shadow-sm overflow-hidden">
      {/* ===== Desktop Table Header ===== */}
      <div className="hidden md:flex justify-between dark:bg-neutral-900 dark:border-neutral-900 px-6 py-3 text-sm font-semibold ">
        <div className="w-[150px]">Order ID</div>
        <div className="w-[200px]">Products</div>
        <div className="w-[100px]">Total</div>
        <div className="w-[120px]">Status</div>
        <div className="w-[150px]">Payment</div>
        <div className="w-[120px] text-right">Actions</div>
      </div>

      {/* ===== Rows ===== */}
      {orders.map((order) => (
        <div key={order.id}>
          {/* Desktop Row */}
          <div className="hidden md:block">
            <OrderRow order={order} onView={() => setSelectedOrder(order)} />
          </div>

          {/* Mobile Card */}
          <div className="block md:hidden border-b dark:bg-neutral-800 dark:border-neutral-700 p-4 space-y-3">
            {/* Header: ID + Date */}
            <div className="flex justify-between items-center">
              <span className="font-semibold">{order.id}</span>
              <span className="text-sm">{order.date}</span>
            </div>

            {/* Products */}
            <div className="flex items-center gap-2">
              {order.items?.slice(0, 4).map((item, i) => (
                <img
                  key={i}
                  src={item.src}
                  alt={item.productName}
                  className="w-8 h-8 rounded-full border-2 border-white dark:bg-neutral-800 dark:border-neutral-700 -ml-2 first:ml-0"
                />
              ))}
            </div>

            {/* Total + Status */}
            <div className="flex justify-between items-center">
              <span className="font-medium">${order.total}</span>
              <span
                className={`px-3 py-1 rounded-full text-xs capitalize ${
                  order.status === "completed"
                    ? "bg-green-100 text-green-600"
                    : order.status === "pending"
                    ? "bg-yellow-100 text-yellow-600"
                    : order.status === "canceled"
                    ? "bg-red-100 text-red-600"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>

            {/* Payment */}
            <div className="flex justify-between items-center text-sm">
              <span className=" capitalize">
                {order.paymentMethodType}
              </span>
              <span
                className={`${
                  order.isPaid ? "text-green-600" : "text-red-600"
                } font-medium`}
              >
                {order.isPaid ? "Paid" : "Unpaid"}
              </span>
            </div>

            {/* Action */}
            <div className="text-right">
              <Button
                color="text-blue-500 hover:underline"
                onClick={() => setSelectedOrder(order)}
                content="View Details"
              />
            </div>
          </div>
        </div>
      ))}

      {/* ===== Modal ===== */}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <OrderSummary
            items={selectedOrder.items}
            subtotal={`$${selectedOrder.subtotal}`}
            shipping={`$${selectedOrder.shipping}`}
            tax={`$${selectedOrder.tax}`}
            discount={`-$${selectedOrder.discount}`}
            total={`$${selectedOrder.total}`}
            paymentMethod={selectedOrder.paymentMethodType}
            isPaid={selectedOrder.isPaid}
            isDelivered={selectedOrder.isDelivered}
            shippingAddress={selectedOrder.shippingAddress}
            showDescription={false}
            showButton={false}
          />
        )}
      </Modal>
    </div>
  );
}
