import { useState, useEffect } from "react";
import { axiosInstance } from "../../AxiosInstance/AxiosInstance";
import Text from "../../SharedElements/Text";
import Button from "../../SharedElements/Button";
import ManageOrderRow from "../../Components/ManageOrders";
import Pagination from "../../Components/Pagination";

export default function ManageOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosInstance
      .get(`/orders?page=${currentPage}&limit=5`)
      .then((res) => {
        setOrders(res.data.data || []);
        setTotalPages(Math.ceil(res.data.totalOrders / 5));
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
      });
  }, [currentPage]);

  const filteredOrders = orders.filter((order) =>
    (order.customerName || order.user?.name || "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="p-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <Text as="h1" content="Manage Orders" MyClass="text-xl font-bold" />
            <Button
              myClass="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              content="Create Order"
            />
          </div>

          {/* Search */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* Table */}
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Order ID</th>
                <th className="p-2 text-left">Customer</th>
                <th className="p-2 text-left">Total</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Date</th>
                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <ManageOrderRow key={order._id} order={order} />
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            maxVisiblePages={5}
          />
        </div>
      </div>
    </div>
  );
}