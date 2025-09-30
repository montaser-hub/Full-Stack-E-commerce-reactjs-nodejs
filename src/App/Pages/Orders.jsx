import {
  FaClipboardList,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { useState } from "react";
import StatCard from "../Components/StatOrdersCard";
import Text from "../SharedElements/Text";
import Dropdown from "../SharedElements/Dropdown.jsx";
import Search from "../SharedElements/search.jsx";
import OrdersTable from "../Components/OrdersTable";
import { orders as initialOrders, stats } from "../Data/orderItems";
import Modal from "../SharedElements/Modal";
import ConfirmDelete from "../SharedElements/ConfirmDelete";
import Alert from "../SharedElements/Alert";

const iconsMap = {
  total: <FaClipboardList />,
  completed: <FaCheckCircle />,
  pending: <FaHourglassHalf />,
};

export default function Orders() {
  const [status, setStatus] = useState("all");
  const [orders, setOrders] = useState(initialOrders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    type: "info",
    message: "",
  });

  // Apply filter
  const filteredOrders =
    status === "all"
      ? orders
      : orders.filter((order) => order.status === status);

  // Trigger modal
  const handleDeleteClick = (orderId) => {
    setOrderToDelete(orderId);
    setIsModalOpen(true);
  };

  // Confirm deletion
  const handleConfirmDelete = () => {
    setOrders(orders.filter((o) => o.id !== orderToDelete));
    setIsModalOpen(false);
    setAlert({
      show: true,
      type: "success",
      message: "Order deleted successfully!",
    });
    setOrderToDelete(null);
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Alert */}
      {alert.show && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="rounded-lg shadow-md p-4 sm:p-6 space-y-6 sm:space-y-8">
        <Text
          as="h1"
          content="Your Orders"
          MyClass="text-xl sm:text-2xl lg:text-[30px] leading-tight font-bold font-['Archivo']"
        />

        {/* Cards Section */}
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

        {/* Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
          <Search
            placeholder="Search by Order ID or Product Name..."
            divClass="w-full sm:w-[320px]"
            inputClass="h-[40px] border border-[#EBEBEA] rounded-md text-sm w-full"
          />
          <Dropdown
            type="select"
            options={[
              { value: "all", label: "All Orders" },
              { value: "pending", label: "Pending" },
              { value: "completed", label: "Completed" },
              { value: "canceled", label: "Canceled" },
            ]}
            value={status}
            onChange={setStatus}
          />
        </div>

        {/* Orders Table */}
        <div>
          <OrdersTable orders={filteredOrders} onDelete={handleDeleteClick} />
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConfirmDelete
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </Modal>
    </div>
  );
}
