import { useState, useEffect } from "react";
import { FaClipboardList, FaCheckCircle, FaHourglassHalf } from "react-icons/fa";
import StatCard from "../Components/StatOrdersCard";
import Text from "../SharedElements/Text";
import Dropdown from "../SharedElements/Dropdown.jsx";
import Search from "../SharedElements/search.jsx";
import OrdersTable from "../Components/OrdersTable";
import Modal from "../SharedElements/Modal";
import ConfirmDelete from "../SharedElements/ConfirmDelete";
import Alert from "../SharedElements/Alert";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const iconsMap = {
  total: <FaClipboardList />,
  completed: <FaCheckCircle />,
  pending: <FaHourglassHalf />,
};

export default function Orders() {
  const myOrdersContent = useSelector((state)=> state.myLang.content)
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || "");
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState([
    { title: "Total Orders", value: 0, subtitle: "All time", type: "total" },
    { title: "Completed Orders", value: 0, subtitle: "All time", type: "completed" },
    { title: "Pending Orders", value: 0, subtitle: "All time", type: "pending" },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: "info", message: "" });

  useEffect(() => {
    setSearchQuery(searchParams.get("query") || "");
  }, [searchParams]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get("/orders/myorders");
        const fetchedOrders = res.data.data.map((order) => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          items: order.cartItems.map((item) => ({
            src: item.product?.images?.[0] || "/images/placeholder.jpg",
            productName: item.product?.name || "Unknown Product",
            price: item.price || 0,
            quantity: item.quantity || 1,
          })),
          total: order.totalOrderPrice || 0,
          status: order.status || "pending",
          paymentMethodType: order.paymentMethodType || "unknown",
          isPaid: order.isPaid || false,
          isDelivered: order.isDelivered || false,
          shippingAddress: order.shippingAddress || {},
          subtotal: order.totalOrderPrice - (order.shippingPrice || 0),
          shipping: order.shippingPrice || 0,
          tax: ((order.totalOrderPrice || 0) * 0.08).toFixed(2),
          discount: 10,
        }));
        setOrders(fetchedOrders);
        setStats([
          { title: "Total Orders", value: fetchedOrders.length, subtitle: "All time", type: "total" },
          { title: "Completed Orders", value: fetchedOrders.filter((o) => o.status === "completed").length, subtitle: "All time", type: "completed" },
          { title: "Pending Orders", value: fetchedOrders.filter((o) => o.status === "pending").length, subtitle: "All time", type: "pending" },
        ]);
      } catch (err) {
        setAlert({ show: true, type: "error", message: err.response?.data?.message || "Failed to load orders." });
      }
    };
    fetchOrders();
  }, []);

  const filteredOrders = orders
    .filter((order) => status === "all" || order.status === status)
    .filter((order) =>
      searchQuery
        ? order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.items.some((item) =>
          item.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : true
    );

  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axiosInstance.put(`/orders/${orderToDelete}/cancel`);
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderToDelete ? { ...order, status: "cancelled", isCancelled: true } : order
        )
      );
      setStats((prev) => [
        { ...prev[0], value: prev[0].value },
        { ...prev[1], value: orders.filter((o) => o.status === "completed").length },
        { ...prev[2], value: orders.filter((o) => o.status === "pending").length - 1 },
      ]);
      setIsModalOpen(false);
      setAlert({ show: true, type: "success", message: "Order cancelled successfully!" });
      setOrderToDelete(null);
    } catch (err) {
      setAlert({ show: true, type: "error", message: err.response?.data?.message || "Failed to cancel order." });
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}
      <div className="rounded-lg shadow-md p-4 sm:p-6 space-y-6">
        <Text as="h1" content={ myOrdersContent.ordertitle} MyClass="text-xl sm:text-2xl lg:text-[30px] font-bold font-['Archivo']" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={iconsMap[item.type]}
              myClass="w-full"
            />
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Search
            context="orders"
            placeholder="Search by order ID or product name..."
            divClass="w-full sm:w-[320px]"
            inputClass="h-[40px] border border-[#EBEBEA] dark:bg-neutral-800 dark:border-neutral-700 dark:text-white rounded-md text-sm w-full"
            onSearch={setSearchQuery}
          />
          <Dropdown
            type="select"
            options={[
              { value: "all", label: myOrdersContent.dropdownallorders },
              { value: "pending", label: myOrdersContent.dropdownpendingorders },
              { value: "completed", label: myOrdersContent.dropdowncompletedorders },
              { value: "cancelled", label: myOrdersContent.dropdowncancelledorders },
            ]}
            value={status}
            onChange={setStatus}
          />
        </div>
        <OrdersTable orders={filteredOrders} onDelete={handleDeleteClick} />
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConfirmDelete onCancel={() => setIsModalOpen(false)} onConfirm={handleConfirmDelete} />
      </Modal>
    </div>
  );
}