import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import WishlistCard from "../Components/WishlistCard";
import Text from "../SharedElements/Text";
import Modal from "../SharedElements/Modal";
import Alert from "../SharedElements/Alert";
import { removeFavorite } from "../../ReduxToolkit/Store"; 
import Button from "../SharedElements/Button";

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
      dispatch(removeFavorite(modalState.itemToDelete.id)); 
      setModalState({ show: false, itemToDelete: null });
      setAlertState({ show: true, message: myContent.wishlistItemRemoved, type: "success" });
    }
  };
  const cancelDelete = () => {
    setModalState({ show: false, itemToDelete: null });
  };
  const myContent = useSelector((state)=> state.myLang.content)

  return (
    <div className="p-8 bg-gray-100 dark:bg-neutral-900 min-h-screen">
      {/* page title  */}
      <Text
        as="h1"
        content={myContent.wishlistTitle}
        MyClass="text-3xl font-bold text-neutral-900 dark:text-white mb-8"
      />

      {/* <Text
        as="p"
        MyClass="text-gray-600 dark:text-gray-400 mb-8"
        content={myContent.wishlistDescEmpty}
      /> */}

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
              category={item.category}
              onRemove={() => handleRemove(item)}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64  rounded-lg">
          <Text
            as="p"
            content={myContent.emptyWishlist}
            MyClass="text-gray-500 italic"
          />
        </div>
      )}

      {/* Modal  */}
      <Modal isOpen={modalState.show} onClose={cancelDelete}>
        <div className="text-center">
          <Text as="h2" content={myContent.modalConfirmDeleteTitle} MyClass="text-lg font-semibold mb-4" />
          <Text
            as="p"
            content={modalState.itemToDelete && myContent.modalConfirmDeleteMessage}
            MyClass="mb-6"
          />
          <div className="flex justify-center gap-4">
              <Button
              onClick={cancelDelete}
              myClass="px-4 py-2 rounded hover:bg-gray-400 bg-gray-300"
              content={myContent.cancel}
            />
            <Button
              onClick={confirmDelete}
              myClass="px-4 py-2 rounded hover:bg-red-600 bg-red-500 text-white"
              content={myContent.delete}
            />
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
