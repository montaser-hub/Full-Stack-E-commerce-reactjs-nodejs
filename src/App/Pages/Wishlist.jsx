import WishlistCard from "../Components/WishlistCard";

// Sample data for the products in the wishlist
const wishlistItems = [
    {
        image: 'timeless-elegance-smartwatch.jpg',
        discount: '17% OFF',
        title: 'Timeless Elegance Smartwatch',
        price: '$189.99',
        oldprice: '$229.99',
        stock: 50, // In stock
    },
    {
        image: 'acoustic-bliss-headphones.jpg',
        title: 'Acoustic Bliss Noise Cancelling Headphones',
        price: '$149.99',
        stock: 2, // Low stock
    },
    {
        image: 'urban-explorer-backpack.jpg',
        discount: '20% OFF',
        title: 'Urban Explorer Designer Backpack',
        price: '$79.99',
        oldprice: '$99.99',
        stock: 30, // In stock
    },
    {
        image: 'brewmaster-coffee-maker.jpg',
        title: 'BrewMaster Smart Coffee Maker',
        price: '$120.00',
        stock: 10, // In stock
    },
    {
        image: 'vitality-pro-fitness-tracker.jpg',
        discount: '14% OFF',
        title: 'Vitality Pro Fitness Tracker',
        price: '$59.99',
        oldprice: '$69.99',
        stock: 0, 
    },
    {
        image: 'soundwave-bluetooth-speaker.jpg',
        title: 'SoundWave Portable Bluetooth Speaker',
        price: '$45.00',
        stock: 25, // In stock
    },
    {
        image: 'infinitypad-tablet-pro.jpg',
        discount: '9% OFF',
        title: 'InfinityPad Tablet Pro',
        price: '$499.00',
        oldprice: '$549.00',
        stock: 40, // In stock
    },
    {
        image: 'hydraflow-eco-bottle.jpg',
        title: 'HydraFlow Eco Bottle',
        price: '$25.00',
        stock: 15, // In stock
    },
];

function Wishlist() {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Your Wishlist &#40;({wishlistItems.length} items)&#41;</h1>
            <p className="text-gray-600 mb-8">Here are the products you've saved for later. Ready to make them yours?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {wishlistItems.map((item, index) => (
                    <WishlistCard
                        key={index}
                        image={item.image}
                        discount={item.discount}
                        title={item.title}
                        price={item.price}
                        oldprice={item.oldprice}
                        stock={item.stock}
                    />
                ))}
            </div>
        </div>
    );
}

export default Wishlist;