import Button from "../SharedElements/Button";
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
return (
    <div className="relative w-80 h-[393px] bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden">
    <div className="relative w-full h-48">
        <img src={props.image} alt={props.title} className="w-full h-full object-cover rounded-t-lg" />
        {props.discount && (
        <div className="absolute top-2 left-2 flex items-center justify-center h-7 px-2 rounded-full font-semibold text-xs text-white bg-red-500">
            <span>{props.discount}</span>
        </div>
        )}
    </div>
    <div className="p-4 flex flex-col justify-between">
        <div>
        <h3 className="text-neutral-900 text-lg font-semibold">{props.title}</h3>
        <div className="flex items-center gap-2 mt-1">
            <span className="text-blue-600 text-xl font-bold">{props.price}</span>
            <span className="text-gray-400 text-sm line-through">{props.oldprice}</span>
        </div>
        <div className="mt-4">
            <span className={`mt-4 text-sm px-2 py-1 rounded-full font-semibold ${stockStatus.color}`}>
            {stockStatus.text}
            </span>
        </div>
        </div>
    </div>
    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
        <Button
        myClass="flex-1 h-10 flex items-center justify-center font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-40"
        onClick={() => console.log('Move to Cart clicked!')}
        status={!stockStatus.isEnabled}
        content="Move to Cart"
        />
        <Button
        myClass="flex-1 h-10 flex items-center justify-center font-medium text-neutral-900 bg-white border border-gray-200 rounded-md hover:bg-gray-100 disabled:opacity-40"
        onClick={() => console.log('Remove clicked!')}
        status={false}
        content="Remove"
        />
    </div>
    </div>
);
};

export default WishlistCard;