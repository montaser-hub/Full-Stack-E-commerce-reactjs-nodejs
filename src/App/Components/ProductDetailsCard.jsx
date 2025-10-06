import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../ReduxToolkit/Store"; 
import Button from "../SharedElements/Button";
import Text from "../SharedElements/Text";
import { CiHeart } from "react-icons/ci"; 
import { HiHeart } from "react-icons/hi"; 
import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { axiosInstance } from "../AxiosInstance/AxiosInstance";
import Alert from "../SharedElements/Alert";
import {addToCart} from "../../ReduxToolkit/cartSlice"

function ProductDetailsCard({ id, image, title, description, price, category, stock }) {
  const dispatch = useDispatch();
  const favoriteProducts = useSelector(state => state.myFavorites.favoriteProducts);
  const [showToast, setShowToast] = useState(false);
  const [ setLoading] = useState(false);
  const isFavorite = favoriteProducts.some(product => product?.id?.toString() === id?.toString());

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id)); 
    } else {
      dispatch(addFavorite({ 
        id: id ? id.toString() : null,
        image,
        title,
        description,
        price, 
        category: category || "Unknown",
      }));
    }
  };

  
  const handleAddToCart = async () => {
      setLoading(true);
      await axiosInstance.post(
        "/carts",
        {
          titleCart: "My Cart",
          items: [{ productId: id, quantity: 1 }],
        },
        { withCredentials: true }
      );console.log(id, price)
      dispatch(addToCart({ id, price }));
      setShowToast(true);
      setLoading(false);
  };
  return (
    <div className="flex flex-col md:flex-row bg-white dark:bg-neutral-800 rounded-2xl shadow-md overflow-hidden transition-shadow hover:shadow-lg w-full max-w-4xl mx-auto">
      
      <div className="relative md:w-1/2 h-96 bg-gray-50 dark:bg-neutral-800 flex items-center justify-center">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
        {id && (<Button
          myClass="absolute top-4 right-4 w-10 h-10 bg-white/70 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white/90 shadow-sm"
          onClick={handleToggleFavorite}
          content={isFavorite
            ? <HiHeart className="w-5 h-5 text-rose-500 transition-colors duration-200"/>
            : <CiHeart className="w-5 h-5 text-neutral-900 hover:text-rose-500 transition-colors duration-200"/>
          }
        />)}  
        
      </div>
          {showToast && (
            <Alert
              type="success"
              message={`${title} added to cart!`}
              duration={2000}
              onClose={() => setShowToast(false)}
            />
          )}
      <div className="md:w-1/2 p-6 flex flex-col justify-between">
        <div className="space-y-3">
          <Text as="h1" content={title} MyClass="text-2xl font-bold text-neutral-900 dark:text-white"/>
          <Text as="p" content={description} MyClass="text-gray-600 dark:text-gray-300"/>
          <Text as="p" content={`Category: ${category || "Unknown"}`} MyClass="text-sm font-medium text-gray-500 dark:text-gray-400"/>
          {price && (<Text as="p" content={`Price: ${price}`} MyClass="text-xl font-bold text-blue-600 dark:text-blue-400"/>)}
          {stock !== undefined && (
            <Text as="p" content={`Stock: ${stock} available`} MyClass="text-sm text-gray-500 dark:text-gray-400"/>
          )}
        </div>
        

        <div className="mt-6">
          {id && (<Button
            myClass="w-full h-12 flex items-center justify-center gap-2 font-medium bg-gradient-to-r from-[rgb(67,94,72)] to-[rgb(87,114,92)] rounded-xl shadow-md hover:from-[rgb(57,84,62)] hover:to-[rgb(77,104,82)] active:scale-95 transition-all duration-200"
            onClick={handleAddToCart}
            content={
              <Text
                as="span"
                MyClass="flex items-center justify-center gap-2 w-full text-white"
                content={<><FiShoppingCart className="w-5 h-5"/> Add to Cart</>}
              />
            }
          /> )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
