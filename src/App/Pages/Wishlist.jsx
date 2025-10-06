import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import WishlistCard from "../Components/WishlistCard";
import Text from "../SharedElements/Text";
import Modal from "../SharedElements/Modal";
import Alert from "../SharedElements/Alert";
import { setFavorites, removeFavorite, setFavoritesLoading } from "../../ReduxToolkit/Store"; 
import Button from "../SharedElements/Button";

function Wishlist() {
  const dispatch = useDispatch();
  const { favoriteProducts, loading } = useSelector(
    (state) => state.myFavorites
  );
  const myContent = useSelector((state) => state.myLang.content);
  const [modalState, setModalState] = useState({ show: false, itemToDelete: null });
  const [ alertState, setAlertState ] = useState( { show: false, message: "", type: "info" } );
  
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        dispatch(setFavoritesLoading(true));
        const res = await axiosInstance.get("/wishlist", {
          withCredentials: true,
        });
        dispatch(setFavorites(res.data.data.items));
      } catch (err) {
        console.error("❌ Error fetching wishlist:", err);
        setAlertState({
          show: true,
          message: myContent.errorOccurred || "Failed to load wishlist",
          type: "error",
        });
      } finally {
        dispatch(setFavoritesLoading(false));
      }
    };

     fetchWishlist();
  }, [ dispatch, myContent ] );
  
  const handleRemove = (item) => {
    setModalState({ show: true, itemToDelete: item });
  };
  const confirmDelete = async () => {
    const item = modalState.itemToDelete;
    if (!item) return;

    try {
      dispatch(setFavoritesLoading(true));
      const productId = item.productId?._id || item.id;
      await axiosInstance.delete(`/wishlist/${productId}`, {
        withCredentials: true,
      });
      dispatch(removeFavorite(productId));
      setAlertState({
        show: true,
        message: myContent.wishlistItemRemoved || "Removed from wishlist",
        type: "success",
      });
    } catch (err) {
      console.error("❌ Error removing wishlist item:", err);
      setAlertState({
        show: true,
        message: myContent.errorOccurred || "Something went wrong!",
        type: "error",
      });
    } finally {
      dispatch(setFavoritesLoading(false));
      setModalState({ show: false, itemToDelete: null });
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
        MyClass="text-center text-3xl font-bold text-neutral-900 dark:text-white mb-8 "
      />

      {/* favorite items */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {favoriteProducts.map((item) => (
            <WishlistCard
              key={item.productId?._id || item.id}
              id={item.productId?._id || item.id}
              image={item.productImage || item.productId?.image || "./not_foundimage.png"}
              title={item.productName || item.productId?.name || "Unknown Product"}
              description={item.description || item.productId?.description}
              price={item.price || item.productId?.price || 0}
              category={item.category || item.productId?.category?.name}
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
            content={myContent.modalConfirmDeleteMessage}
            MyClass="mb-6"
          />
          <div className="flex justify-center gap-4">
              <Button
              onClick={cancelDelete}
              myClass="px-4 py-2 rounded hover:bg-gray-400 bg-gray-300"
              content={myContent.cancel || "Cancel"}
            />
            <Button
              onClick={confirmDelete}
              myClass="px-4 py-2 rounded hover:bg-red-600 bg-red-500 text-white"
              content={myContent.delete || "Delete"}
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
