
import { FiShoppingCart } from "react-icons/fi";
import Button from "../SharedElements/Button";
import Text from "../SharedElements/Text";
import ForwardTo from "../SharedElements/ForwardTo"; 

function WishlistCard(props) {
const getStockStatus = (stock) => {
    if (stock === 0) {
    return { text: 'Out of Stock', color: 'bg-red-500 text-white', isEnabled: false };
    } else if (stock >= 1 && stock <= 4) {
    return { text: `Low Stock (${stock} left)`, color: 'bg-yellow-500 text-yellow-900', isEnabled: true };
    } else {
    return { text: `In Stock (${stock} left)`, color: 'bg-green-500 text-white', isEnabled: true };
    }
};

const stockStatus = getStockStatus(props.stock);
const productId = props.id;

return (
    <div className="relative w-72 h-[460px] bg-white rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
    {/* Image */}
    <div className="relative w-full h-64 rounded-t-lg overflow-hidden flex items-center justify-center bg-gray-50">
        <img
        src={props.image}
        alt={props.title}
        className="max-h-full max-w-full object-contain mx-auto transition-transform duration-300 hover:scale-105"
        />
    </div>
    {/* Details */}
    <div className="p-4 flex flex-col justify-between flex-1">
        <div>
            <Text as="h3" MyClass="text-neutral-900 text-lg font-semibold"
                content={
                    <ForwardTo
                        to={`/products/${props.id}`} 
                        myClass="block truncate hover:text-blue-600 transition-colors duration-200"
                        title={props.title} 
                        content={
                            <div>
                                <Text 
                                    as="span" 
                                    content={props.title.length > 15 ? `${props.title.slice(0, 15)}...` : props.title} 
                                    MyClass="font-bold" 
                                />
                                <Text 
                                    as="p" 
                                    content={props.description.length > 20 ? `${props.description.slice(0, 20)}...` : props.description} 
                                    MyClass="text-sm" 
                                />
                            </div>
                        }
                    />
                }
            />
            <div className="flex items-center gap-2 mt-2">
                <Text 
                    as="span" 
                    content={props.oldPrice} 
                    MyClass="text-gray-400 text-sm line-through"
                />
                <Text 
                    as="span" 
                    content={props.price} 
                    MyClass="text-blue-600 text-xl font-bold"
                />
            </div>
            <div className="mt-2">
                <Text 
                    as="span" 
                    content={stockStatus.text} 
                    MyClass={`text-sm px-2 py-1 rounded-full font-semibold ${stockStatus.color}`} 
                />
            </div>
        </div>
        <div className="mt-4 flex gap-3">
        {/*  Add to Cart */}
        <Button
            myClass="flex-1 px-1.5 flex items-center justify-center gap-2 font-semibold text-white 
                    bg-gradient-to-r from-pink-500 to-rose-500 
                    rounded-xl shadow-md 
                    hover:from-pink-600 hover:to-rose-600 
                    active:scale-95 transition-all duration-200"
            onClick={() => console.log('Move to Cart clicked!')}
            status={!stockStatus.isEnabled}
            content={
            <div className="flex items-center gap-2">
                <FiShoppingCart className="w-5 h-5 text-white" />
                <Text as="span" content="Add to Cart" />
            </div>
            }
        />
        {/*  Remove */}
        <Button
            myClass="flex-1 h-12 flex items-center justify-center gap-2 font-medium 
                    text-gray-700 bg-gray-100 
                    border border-gray-300 
                    rounded-xl 
                    hover:bg-gray-200 hover:text-gray-900 
                    active:scale-95 transition-all duration-200"
            onClick={() => props.onRemove(productId)}
            status={false}
            content="Remove"
        />
        </div>
    </div>
    </div>
);
}

export default WishlistCard;