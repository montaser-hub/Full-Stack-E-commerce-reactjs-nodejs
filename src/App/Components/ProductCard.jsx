import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../../ReduxToolkit/Store"; 
import ForwardTo from "../SharedElements/ForwardTo";
import { CiHeart } from "react-icons/ci"; 
import { HiHeart } from "react-icons/hi"; 
import Button from "../SharedElements/Button";
import { FiShoppingCart } from "react-icons/fi";

function ProductCard(props) {
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
        <div className="relative w-60 h-[418px] bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <div className="relative w-full h-60 rounded-t-lg overflow-hidden flex items-center justify-center bg-gray-50">
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
            <div className="p-4 flex flex-col justify-between h-[158px]">
                <div>
                    <h3 className="text-neutral-900 text-lg font-semibold">
                    <ForwardTo
                        to={`/products/${props.id}`} 
                        myClass="block truncate hover:text-blue-600 transition-colors duration-200"
                        title={props.title} 
                        content={
                        <div>
                            <span className="font-bold">{props.title.length > 15 ? `${props.title.slice(0, 15)}...` : props.title}</span>
                            <p className="text-sm">{props.description.length > 20 ? `${props.description.slice(0, 20)}...` : props.description}</p>
                        </div>
                        }
                    />
                    </h3>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <span className="text-gray-400 text-sm line-through">{props.oldPrice}</span>
                        <span className="text-blue-600 text-xl font-bold">{props.Price}</span>
                    </div>
                </div>
                <Button
                    myClass="mt-4 w-full h-10 flex items-center justify-center gap-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 active:bg-rose-700"
                    onClick={() => console.log('Move to cart')}
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
