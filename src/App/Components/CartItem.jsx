import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";

const CartItem = ({
  src,
  alt = "product",
  productName,
  price,
  quantity,
  onUpdate,
  onRemove,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 border-b sm:flex sm:items-center sm:justify-between">
      <div className="flex items-center space-x-4 sm:w-1/3 py-2">
        <div className="sm:w-16 sm:h-16 w-full">
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover rounded"
          />
        </div>
        <div>
          <p className="font-medium text-gray-900">{productName}</p>
          <p className="text-gray-600 text-sm">Price: {price}</p>
        </div>
      </div>

      <div className="flex justify-center sm:w-1/3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => onUpdate(quantity - 1)}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            <FaMinus />
          </button>
          <span className="px-4 py-1 border border-gray-300 rounded">
            {quantity}
          </span>
          <button
            onClick={() => onUpdate(quantity + 1)}
            className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100"
          >
            <FaPlus />
          </button>
        </div>
      </div>
      <div className="flex justify-center sm:justify-end sm:w-1/3 mt-2 sm:mt-0">
        <button
          onClick={onRemove}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
        >
          <FaTrash className="text-sm" />
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
