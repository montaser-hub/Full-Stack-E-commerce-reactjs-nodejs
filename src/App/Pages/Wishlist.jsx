import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import WishlistCard from "../Components/WishlistCard";
import Text from "../SharedElements/Text";
import Modal from "../SharedElements/Modal";
import Alert from "../SharedElements/Alert";
import { removeFavorite } from "../../ReduxToolkit/Store"; 

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.myFavorites.favoriteProducts
  );
  const [modalState, setModalState] = useState({ show: false, itemToDelete: null });
  const [alertState, setAlertState] = useState({ show: false, message: "", type: "info" });
  const handleRemove = (item) => {
    setModalState({ show: true, itemToDelete: item });
  };
  const confirmDelete = () => {
    if (modalState.itemToDelete) {
      dispatch(removeFavorite(modalState.itemToDelete.id)); // إزالة العنصر من الـ Redux
      setModalState({ show: false, itemToDelete: null });
      setAlertState({ show: true, message: "Item removed from wishlist.", type: "success" });
    }
  };
  const cancelDelete = () => {
    setModalState({ show: false, itemToDelete: null });
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* page title  */}
      <Text
        as="h1"
        content={`Your Wishlist (${wishlistItems.length} items)`}
        MyClass="text-3xl font-bold text-neutral-900 dark:text-white mb-2"
      />

      {/* page description  */}
      <Text
        as="p"
        MyClass="text-gray-600 dark:text-gray-400 mb-8"
        content={
          wishlistItems.length > 0
            ? "Here are the products you've saved for later. Ready to make them yours?"
            : "Your wishlist is empty. Start adding products you love!"
        }
      />

      {/* favorite items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {wishlistItems.map((item) => (
            <WishlistCard
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
              description={item.description}
              price={item.price}
              oldPrice={item.oldPrice}
              stock={item.stock}
              discount={item.discount}
              onRemove={() => handleRemove(item)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 border border-dashed rounded-lg">
          <Text
            as="p"
            content="No items found in your Wishlist."
            MyClass="text-gray-500 italic"
          />
        </div>
      )}

      {/* Modal  */}
      <Modal isOpen={modalState.show} onClose={cancelDelete}>
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
          <p className="mb-6">
            Are you sure you want to remove "{modalState.itemToDelete?.title}" from your wishlist?
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={cancelDelete}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>

      {/* Alert */}
      {alertState.show && (
        <Alert
          type={alertState.type}
          message={alertState.message}
          duration={3000}
          onClose={() => setAlertState({ ...alertState, show: false })}
        />
      )}
    </div>
  );
}

export default Wishlist;
