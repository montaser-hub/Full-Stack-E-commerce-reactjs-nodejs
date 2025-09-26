import { CiHeart } from 'react-icons/ci'; 
import { HiOutlineShoppingBag } from "react-icons/hi2";

function ProductCard (props) {
return (
    <div className="relative w-60 h-[418px] bg-white rounded-lg border border-gray-200 shadow-md">
    <div className="relative w-full h-60 rounded-t-lg overflow-hidden">
        <img src={props.image} alt={props.title} className="w-full h-full object-cover" />
        <button className="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-white/50 rounded-full hover:bg-white/70">
        <CiHeart className="w-4 h-4 text-neutral-900" />
        </button>
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
        <button className="mt-4 w-full h-10 flex items-center justify-center gap-2 bg-rose-500 text-white font-medium rounded-md hover:bg-rose-600 active:bg-rose-700">
        <HiOutlineShoppingBag className="w-4 h-4 text-white" />
        <span>Add to Cart</span>
        </button>
    </div>
    </div>
);
};
export default ProductCard;