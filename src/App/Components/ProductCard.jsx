import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../ReduxToolkit/Store";
import ForwardTo from "../SharedElements/ForwardTo";
import { CiHeart } from "react-icons/ci";
import { HiHeart } from "react-icons/hi";
import Button from "../SharedElements/Button";
import { FiShoppingCart } from "react-icons/fi";
import Text from "../SharedElements/Text";
import { addToCart } from "../../ReduxToolkit/Store";
import Alert from "../SharedElements/Alert";
import { useState } from "react";

function ProductCard(props) {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(
    (state) => state.myFavorites.favoriteProducts
  );
  const isFavorite = favoriteProducts.some(
    (product) => product.id === props.id
  );
  const [showToast, setShowToast] = useState(false);
  const [ showFavToast, setShowFavToast ] = useState( false );
  
  const product = {
    id: props.id,
    image: props.image,
    title: props.title,
    description: props.description,
    price: props.price,
    category: props.categoryId?.name || "Unknown Category",
    quantity: props.quantity,
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(props.id));
      setShowFavToast("removed");
    } else {
      dispatch(addFavorite(product));
      setShowFavToast("added");
    }
  };

  const handleAddToCart = () => {
    if (product.quantity === 0) {
      return (
        <Alert
          type="failed"
          message="Out of stock!"
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      );
    }
    dispatch(addToCart(product));
    setShowToast(true);
  };

  return (
    <div className="relative w-60 bg-white rounded-lg border shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-neutral-800 dark:border-neutral-800">
      {/* Image And Heart Icon*/}
      <div className="relative w-full h-60 rounded-t-lg overflow-hidden flex items-center justify-center bg-gray-50  dark:bg-neutral-800">
        <img
          src={props.image || "./not_foundimage.png"}
          alt={props.title}
          className="w-full h-full object-cover block transition-transform duration-300 hover:scale-105 max-h-full max-w-full  mx-auto "
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "./not_foundimage.png";
          }}
        />
        <Button
          myClass="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-white/70 rounded-full border border-gray-300 hover:bg-white/90 shadow-sm"
          onClick={handleToggleFavorite}
          content={
            isFavorite ? (
              <HiHeart className="w-5 h-5 text-rose-500 transition-colors duration-200" />
            ) : (
              <CiHeart className="w-5 h-5 text-neutral-900 hover:text-rose-500 transition-colors duration-200" />
            )
          }
        />
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col justify-between h-[220px] ">
        <div>
          <Text
            as="h3"
            MyClass="text-neutral-900 text-lg font-semibold  dark:text-white"
            content={
              <ForwardTo
                to={`/products/${props.id}`}
                myClass="block truncate hover:text-blue-600 transition-colors duration-200 dark:hover:text-blue-400"
                title={props.title}
                content={
                  <div>
                    <Text
                      as="span"
                      content={`Name: ${
                        props.title.length > 15
                          ? `${props.title.slice(0, 15)}...`
                          : props.title
                      }`}
                      MyClass="font-bold block"
                    />
                    <Text
                      as="p"
                      content={`Description: ${
                        props.description.length > 10
                          ? `${props.description.slice(0, 10)}...`
                          : props.description
                      }`}
                      MyClass="text-sm mt-1"
                    />
                  </div>
                }
              />
            }
          />
          <div className="flex items-center justify-between mt-2 dark:text-white font-semibold">
            <Text
              as="span"
              content={`Category: ${
                props.categoryId?.name || "Unknown Category"
              }`}
              MyClass=" text-sm"
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <Text
              as="span"
              content={props.Price}
              MyClass="text-blue-600 text-xl font-bold dark:text-blue-400"
            />
          </div>
        </div>

        {/* Add to Cart */}
        <div className="mt-4 w-full">
          <Button
            myClass={`w-full h-12 flex items-center justify-center gap-2 font-medium 
                    bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)]
                    rounded-xl shadow-md 
                    hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] 
                    active:scale-95 transition-all duration-200`}
            onClick={handleAddToCart}
            content={
              <Text
                as="span"
                MyClass="flex items-center justify-center gap-2 w-full text-white"
                content={
                  <>
                    <FiShoppingCart className="w-5 h-5" />
                    Add to Cart
                  </>
                }
              />
            }
          />
        </div>
      </div>
      {showToast && (
        <Alert
          type="success"
          message={`${props.title} added to cart!`}
          duration={2000}
          onClose={() => setShowToast(false)}
        />
      )}
      {showFavToast && (
        <Alert
          type={showFavToast === "removed" ? "error" : "success"}
          message={
            showFavToast === "removed"
              ? `${props.title} removed from favorites!`
              : `${props.title} added to favorites!`
          }
          duration={2000}
          onClose={() => setShowFavToast(false)}
        />
      )}
    </div>
  );
}

export default ProductCard;
