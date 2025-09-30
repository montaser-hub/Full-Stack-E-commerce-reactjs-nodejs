import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../ReduxToolkit/Store"; 
import ForwardTo from "../SharedElements/ForwardTo";
import { CiHeart } from "react-icons/ci"; 
import { HiHeart } from "react-icons/hi"; 
import Button from "../SharedElements/Button";
import { FiShoppingCart } from "react-icons/fi";
import Text from "../SharedElements/Text";

function ProductCard(props) {
const getStockStatus = (stock) => {
    if (stock === 0) {
    return { text: 'Out of Stock', color: 'bg-red-500 text-white', isEnabled: false };
    } else if (stock >= 1 && stock <= 4) {
    return { text: `Low Stock (${stock} left)`, color: 'bg-yellow-500 text-yellow-900', isEnabled: true };
    } else {
    return { text: `In Stock (${stock} left)`, color: 'bg-green-500 text-white', isEnabled: true };
    }
};

const stockStatus = getStockStatus(10);
const dispatch = useDispatch();
const favoriteProducts = useSelector((state) => state.myFavorites.favoriteProducts);
const isFavorite = favoriteProducts.some(product => product.id === props.id);
const handleToggleFavorite = () => {
    if (isFavorite) {
    dispatch(removeFavorite(props.id)); 
    } else {
    dispatch(addFavorite({ 
        id: props.id,
        image: props.image,
        title: props.title,
        description: props.description,
        price: props.Price, 
        oldPrice: props.oldPrice,
        stock: 10,
        discount: null 
    }));
    }
};

return (
  <div className="relative w-60 bg-white rounded-lg bordershadow-md hover:shadow-lg transition-shadow duration-300  dark:bg-neutral-800">
    {/* Image And Heart Icon*/}
    <div className="relative w-full h-60 rounded-t-lg overflow-hidden flex items-center justify-center bg-gray-50  dark:bg-neutral-800">
      <img
        src={props.image}
        alt={props.title}
        className="max-h-full max-w-full object-contain mx-auto transition-transform duration-300 hover:scale-105"
        loading="lazy"
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
              myClass="block truncate hover:text-blue-600 transition-colors duration-200"
              title={props.title}
              content={
                <div>
                  <Text
                    as="span"
                    content={
                      props.title.length > 15
                        ? `${props.title.slice(0, 15)}...`
                        : props.title
                    }
                    MyClass="font-bold block"
                  />
                  <Text
                    as="p"
                    content={
                      props.description.length > 20
                        ? `${props.description.slice(0, 20)}...`
                        : props.description
                    }
                    MyClass="text-sm mt-1"
                  />
                </div>
              }
            />
          }
        />

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <Text
              as="span"
              content={props.oldPrice}
              MyClass="text-gray-400 text-sm line-through"
            />
            <Text
              as="span"
              content={props.Price}
              MyClass="text-blue-600 text-xl font-bold"
            />
          </div>
        </div>

        <div className="mt-2">
          <Text
            as="span"
            content={stockStatus.text}
            MyClass={`text-sm px-2 py-1 rounded-full font-semibold ${stockStatus.color}`}
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
          onClick={() => console.log("Move to Cart clicked!")}
          status={!stockStatus.isEnabled}
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
  </div>
);
}

export default ProductCard;

