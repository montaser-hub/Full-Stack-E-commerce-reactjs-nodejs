// import { useState } from "react";
// import { CiHeart } from "react-icons/ci"; 
// import { HiHeart } from "react-icons/hi"; 
// import Button from "../SharedElements/Button";
// import { FiShoppingCart } from "react-icons/fi";

// function ProductCard(props) {
    
// const [liked, setLiked] = useState(false); 

// return (
//     <div className="relative w-60 h-[418px] bg-white rounded-lg border border-gray-200 shadow-md">
//     <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
//         <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
//         <Button
//         myClass="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-white/50 rounded-full border border-gray-300 hover:bg-white/70"
//         onClick={() => setLiked(!liked)}
//         content={
//             liked ? (
//             <HiHeart className="w-5 h-5 text-rose-500 transition-colors duration-200" />
//             ) : (
//             <CiHeart className="w-5 h-5 text-neutral-900 hover:text-rose-500 transition-colors duration-200" />
//             )
//         }
//         />      
//     </div>
//     <div className="p-4 flex flex-col justify-between h-[158px]">
//         <div>
//         <p className="text-gray-500 text-sm font-normal">{props.description}</p>
//         <h3 className="text-neutral-900 text-lg font-semibold">{props.title}</h3>
//         </div>
//         <div className="flex items-center justify-between mt-4">
//         <div className="flex items-center gap-2">
//             <span className="text-gray-400 text-sm self-center">{props.oldPrice}</span>
//             <span className="text-blue-600 text-xl font-bold">{props.Price}</span>
//         </div>
//         </div>
//         <Button
//         myClass="mt-4 w-full h-10 flex items-center justify-center gap-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 active:bg-rose-700"
//         onClick={() => console.log('Move to cart')}
//         content={
//             <>
//             <FiShoppingCart className="w-4 h-4 text-white" /> 
//             <span>Add to Cart</span>
//             </>
//         }
//         />
//     </div>
//     </div>
// );
// }
// export default ProductCard;
import { useDispatch, useSelector } from "react-redux";
import { CiHeart } from "react-icons/ci"; 
import { HiHeart } from "react-icons/hi"; 
import { FiShoppingCart } from "react-icons/fi";
import Button from "../SharedElements/Button";
import { addFavorite, removeFavorite } from "../store/favoritesSlice"; 
function ProductCard(props) {
const dispatch = useDispatch();
const favorites = useSelector((state) => state.myFavorites.favoriteProducts);
const isFavorite = favorites.some((product) => product.id === props.id);
const toggleFavorite = () => {
    if (isFavorite) {
    dispatch(removeFavorite(props.id));
    } else {
    dispatch(
        addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        Price: props.Price,
        oldPrice: props.oldPrice,
        })
    );
    }
};

return (
    <div className="relative w-60 h-[418px] bg-white rounded-lg border border-gray-200 shadow-md">
    <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
        <img
        src={props.image}
        alt={props.title}
        className="w-full h-full object-cover"
        />
        <Button
        myClass="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-white/50 rounded-full border border-gray-300 hover:bg-white/70"
        onClick={toggleFavorite}
        content={
            isFavorite ? (
            <HiHeart className="w-5 h-5 text-rose-500 transition-colors duration-200" />
            ) : (
            <CiHeart className="w-5 h-5 text-neutral-900 hover:text-rose-500 transition-colors duration-200" />
            )
        }
        />
    </div>
    <div className="p-4 flex flex-col justify-between h-[158px]">
        <div>
        <p className="text-gray-500 text-sm font-normal">{props.description}</p>
        <h3 className="text-neutral-900 text-lg font-semibold">{props.title}</h3>
        </div>
        <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm self-center">{props.oldPrice}</span>
            <span className="text-blue-600 text-xl font-bold">{props.Price}</span>
        </div>
        </div>
        <Button
        myClass="mt-4 w-full h-10 flex items-center justify-center gap-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 active:bg-rose-700"
        onClick={() => console.log("Move to cart")}
        content={
            <>
            <FiShoppingCart className="w-4 h-4 text-white" /> 
            <span>Add to Cart</span>
            </>
        }
        />
    </div>
    </div>
);
}
export default ProductCard;
