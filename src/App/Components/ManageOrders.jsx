export default function ManageOrderRow({ order }) {
  return (
    <tr key={order._id} className="border-t">
      <td className="p-2">{order._id}</td>
      <td className="p-2">{order.customerName || order.user?.name || "N/A"}</td>
      <td className="p-2">${order.total || 0}</td>
      <td className="p-2">
        <span
          className={`px-2 py-1 rounded text-white ${
            order.status === "pending"
              ? "bg-yellow-500"
              : order.status === "completed"
              ? "bg-green-500"
              : "bg-gray-400"
          }`}
        >
          {order.status || "N/A"}
        </span>
      </td>
      <td className="p-2">
        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}
      </td>
      <td className="p-2">
        <button className="text-blue-500 mr-2 hover:underline">View</button>
        <button className="text-red-500 hover:underline">Delete</button>
      </td>
    </tr>
  );
}