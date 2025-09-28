const ItemsOrder = ({
  src = "",
  alt = "image",
  productName = "",
  productQuantity = "",
  productPrice = "",
}) => {
  return (
    <div className="flex items-center space-x-4 p-4 border-b">
      <img src={src} alt={alt} className="w-12 h-12" />
      <div className="flex-1">
        <p className="font-medium">{productName}</p>
        <p className="text-gray-600">Quantity: {productQuantity}</p>
      </div>
      <p className="font-bold">{productPrice}</p>
    </div>
  );
};

export default ItemsOrder;
