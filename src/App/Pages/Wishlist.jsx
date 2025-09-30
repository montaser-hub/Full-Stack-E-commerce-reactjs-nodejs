// Wishlist.jsx
import { useSelector, useDispatch } from "react-redux";
import WishlistCard from "../Components/WishlistCard"; 
import { removeFavorite } from "../../ReduxToolkit/Store"; 
import Text from "../SharedElements/Text";

function Wishlist() {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.myFavorites.favoriteProducts );

  const handleRemove = (productId) => {
    dispatch(removeFavorite(productId));
  };
  
  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Text as="h1" content={`Your Wishlist (${wishlistItems.length} items)`} MyClass="text-3xl font-bold text-neutral-900 dark:text-white mb-2" />
      
      <Text as="p" MyClass="text-gray-600 dark:text-gray-400 mb-8" 
        content={
            wishlistItems.length > 0
              ? "Here are the products you've saved for later. Ready to make them yours?"
              : "Your wishlist is empty. Start adding products you love!"
        }
      />
      
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
              onRemove={handleRemove} 
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center h-64 border border-dashed rounded-lg">
            <Text as="p" content="No items found in your Wishlist." MyClass="text-gray-500 italic" />
        </div>
      )}
    </div>
  );
}

export default Wishlist;
