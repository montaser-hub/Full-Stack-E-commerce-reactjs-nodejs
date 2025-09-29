
import { FiShoppingCart } from "react-icons/fi";
import Button from "../SharedElements/Button";

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
    <div className="relative w-full h-64 rounded-t-lg overflow-hidden flex items-center justify-center bg-gray-50">
        <img
        src={props.image}
        alt={props.title}
        className="max-h-full max-w-full object-contain mx-auto transition-transform duration-300 hover:scale-105"
        />
    </div>
    <div className="p-4 flex flex-col justify-between flex-1">
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
        <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-400 text-sm line-through">{props.oldPrice}</span>
            <span className="text-blue-600 text-xl font-bold">{props.price}</span>
        </div>
        <div className="mt-2">
            <span className={`text-sm px-2 py-1 rounded-full font-semibold ${stockStatus.color}`}>
            {stockStatus.text}
            </span>
        </div>
        </div>
        <div className="mt-4 flex gap-2">
        <Button
            myClass="flex-1 h-12 flex items-center justify-center gap-2 font-medium text-white bg-rose-500 rounded-md hover:bg-rose-600 active:bg-rose-700 transition-colors duration-200 disabled:opacity-50"
            onClick={() => console.log('Move to Cart clicked!')}
            status={!stockStatus.isEnabled}
            content={
            <>
                <FiShoppingCart className="w-5 h-5 text-white" />
                <span>Add to Cart</span>
            </>
            }
        />
        <Button
            myClass="flex-1 h-12 flex items-center justify-center gap-2 font-medium text-neutral-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 disabled:opacity-50"
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