import Text from "../SharedElements/Text";
import Button from "../SharedElements/Button";

export default function OrderRow({ order, onView }) {
  return (
    <div className="flex items-center justify-between border-b border-[#EBEBEA]  text-gray-600  dark:text-white dark:bg-neutral-800 dark:border-neutral-700 py-4 px-6">
      {/* Order ID + Date */}
      <div className="flex flex-col w-[150px]">
        <Text
          as="span"
          content={order.id}
          MyClass="font-semibold text-gray-800 dark:text-white"
        />
        <Text
          as="span"
          content={order.date}
          MyClass="text-sm text-gray-500 dark:text-gray-200"
        />
      </div>

      {/* Products */}
      <div className="flex items-center gap-2 w-[200px]">
        {order.items?.slice(0, 4).map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt={item.productName}
            className="w-8 h-8 rounded-full border-2 dark:border-white border-gray-800  -ml-2 first:ml-0"
          />
        ))}
      </div>

      {/* Total */}
      <div className="w-[100px]">
        <Text
          as="span"
          content={`$${order.total}`}
          MyClass="font-medium text-gray-800 dark:text-white"
        />
      </div>

      {/* Status */}
      <div className="w-[120px]">
        <span
          className={`px-3 py-1 rounded-full text-sm capitalize ${
            order.status === "completed"
              ? "bg-green-100 text-green-600"
              : order.status === "pending"
              ? "bg-yellow-100 text-yellow-600"
              : order.status === "canceled"
              ? "bg-red-100 text-red-600"
              : "bg-gray-100 text-gray-600 dark:text-white"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Payment Info */}
      <div className="w-[150px] flex items-center justify-start gap-2 text-sm">
        <span className="text-gray-700 dark:text-white capitalize">
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
      <div className="w-[120px] text-right">
        <Button
          color="text-blue-500 hover:underline"
          myClass=""
          onClick={onView}
          content="View Details"
        />
      </div>
    </div>
  );
}
