import { useState } from "react";
import { FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import Modal from "../SharedElements/Modal";
import ConfirmDelete from "../SharedElements/ConfirmDelete";
import { useDispatch, useSelector } from "react-redux";
import {
  setCart,
  updateQuantity,
} from "../../ReduxToolkit/Store";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
const ShoppingCard = ({
  src,
  alt = "product",
  productName,
  price,
  quantity,
  onRemove,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ alert, setAlert ] = useState( null );
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cart);
  const handleRemoveClick = () => setIsModalOpen(true);
  const handleConfirmDelete = () => {
    onRemove();
    setIsModalOpen(false);
  };
const handleQuantityChange = async (productId, quantity) => {
  if ( quantity < 1 ) return; 
  
    dispatch(updateQuantity({ productId, quantity }));

    try {
      await axiosInstance.put(`/carts/items/${productId}`, {
        quantity,
      });
    } catch (err) {
      console.error("update quantity failed:", err);
      setAlert({
        type: "error",
        message:
        err?.response?.data?.message || "Failed to update item quantity",
      });

      // revert state if API fails
      dispatch(setCart({ items: cartState.cartItems.map((i) => i.productId === productId ? { ...i, quantity } : i) }));
    }
  };
  return (
    <>
      <div className="bg-white dark:text-white dark:bg-neutral-800 dark:border-neutral-700 rounded-lg shadow p-6 border-b sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center space-x-4 sm:w-1/3 py-2">
          <div className="sm:w-16 sm:h-16 w-full">
            <img
              src={src || "./not_foundimage.png"}
              alt={alt}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div>
            <p className="font-medium text-gray-900 dark:text-white">
              {productName}
            </p>
            <p className="text-gray-600 text-sm dark:text-white">
              Price: ${price}
            </p>
          </div>
        </div>

        <div className="flex justify-center sm:w-1/3">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-600"
            >
              <FaMinus />
            </button>
            <span className="px-4 py-1 border border-gray-300 rounded">
              {quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-100 dark:hover:bg-neutral-600"
            >
              <FaPlus />
            </button>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end sm:w-1/3 mt-2 sm:mt-0">
          <button
            onClick={handleRemoveClick}
            className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-600 transition"
          >
            <FaTrash className="text-sm" /> Remove
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ConfirmDelete
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      </Modal>
    </>
  );
};

export default ShoppingCard;
