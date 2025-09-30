import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import WishlistCard from "../Components/WishlistCard";
import { removeFavorite } from "../../ReduxToolkit/Store";
import Text from "../SharedElements/Text";
import ConfirmModel from "../Components/ConfirmModel"; 

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector(
    (state) => state.myFavorites.favoriteProducts
  );

  const [modelState, setmodelState] = useState({
    show: false,
    itemToDelete: null,
  });

  const handleRemove = (item) => {
    setmodelState({ show: true, itemToDelete: item });
  };

  const confirmRemove = () => {
    if (modelState.itemToDelete) {
      dispatch(removeFavorite(modelState.itemToDelete.id));
    }
    setmodelState({ show: false, itemToDelete: null });
  };

  const cancelRemove = () => {
    setmodelState({ show: false, itemToDelete: null });
  };

  const getmodelTitle = () => {
    if (!modelState.itemToDelete) return "";
    const title = modelState.itemToDelete.title;
    return title.length > 15 ? `${title.slice(0, 15)}...` : title;
  };

  return (
    // Main
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Text
        as="h1"
        content={`Your Wishlist (${wishlistItems.length} items)`}
        MyClass="text-3xl font-bold text-neutral-900 dark:text-white mb-2"
      />

      <Text
        as="p"
        MyClass="text-gray-600 dark:text-gray-400 mb-8"
        content={
          wishlistItems.length > 0
            ? "Here are the products you've saved for later. Ready to make them yours?"
            : "Your wishlist is empty. Start adding products you love!"
        }
      />
      {/* Items */}
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
        // Empty Page (No Items Found)
        <div className="flex justify-center items-center h-64 border border-dashed rounded-lg">
          <Text
            as="p"
            content="No items found in your Wishlist."
            MyClass="text-gray-500 italic"
          />
        </div>
      )}
      {/* Confirm Delete */}
      {modelState.show && (
        <ConfirmModel
          title="Confirm Remove Item"
          message={`Are you sure you want to remove "${getmodelTitle()}" from your Wishlist?`}
          onConfirm={confirmRemove}
          onCancel={cancelRemove}
          confirmText="Yes, Remove"
          cancelText="Cancel"
        />
      )}
    </div>
  );
}

export default Wishlist;
